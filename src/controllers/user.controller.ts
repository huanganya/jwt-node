import * as userService from "../services/user.service";
import bcrypt from "bcryptjs";
import jwt = require("jsonwebtoken");

const JWT_SECRECT = "tokey_key";

export const signin = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(200).send("All inputs are required");
    }

    const user = await userService.isUserExistE(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
        expiresIn: "2000h",
      });

      user.token = token;

      return res.status(200).send(token);
    }
    return res.status(200).send("Invalid credentials");
  } catch (e) {
    return res.status(200).json({ status: 400, message: e.message });
  }
};

export const signup = async (req, res, next) => {
  try {
    // Get user input
    const { username, email, password, rpassword } = req.body;

    // Validate user input
    if (!(email && password && username && rpassword)) {
      return res.status(200).send("All inputs are required");
    }

    if (password != rpassword) {
      return res.status(200).send("Password not match");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    // Check if user already exist
    // Validate if user exist in our database
    const oldUser = await userService.isUserExist(email, username);

    if (oldUser) {
      return res.status(200).send("User already exist");
    }

    // Create user in our database
    const user = await userService.createUser({
      username: username,
      email: email,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
      expiresIn: "2000h",
    });

    // Save user token
    user.token = token;

    // Return new user
    return res.status(200).send(token);
  } catch (err) {
    return res.status(200).json({ status: 400, message: err.message });
  }
};

export const googlesign = async (req, res, next) => {
  try {
    const { email, username } = req.body;
    let user = await userService.isGoogleUser(email, username);
    if (user) {
      // Create token
      const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
        expiresIn: "2000h",
      });

      // Save user token
      user.token = token;
      return res.status(200).send(token);
    }

    // Create user in our database
    user = await userService.createGoogleUser(email, username);
    // Create token
    const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
      expiresIn: "2000h",
    });

    // Save user token
    user.token = token;

    return res.status(200).send(token);
  } catch (err) {
    return res.status(200).json({ status: 400, message: err.message });
  }
};
