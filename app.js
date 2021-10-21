require("dotenv").config();
require("./config/database").connect();
const EncryptionUtil = require("./utils/encryption.ts");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/user");
const auth = require("./middleware/auth");

const app = express();

app.use(express.json({ limit: "50mb" }));
const JWT_SECRECT = "tokey_key";
app.post("/register", async (req, res) => {
  try {
    // Get user input
    const { userName, email, password } = req.body;
    console.log(req.body);
    // Validate user input
    if (!(email && password && userName)) {
      res.status(400).send("All input is required");
    }

    const Pass = await EncryptionUtil.audioPassword(password);
    const decryptedPass = await EncryptionUtil.audioAes256CbcDecryption(
      Pass.valueToBeDecrypted,
      Pass.encryptionKey,
      Pass.encrytionIV
    );
    console.log("decryptedPass111", decryptedPass);

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ $or: [{ email }, { userName }] });

    if (oldUser) {
      console.log(`oldUser already exist`);
      return res.status(409).send("User Already Exist. Please Login");
    }
    console.log("oldUser", oldUser);
    //Encrypt user password
    encryptedPassword = await bcrypt.hash(decryptedPass, 10);
    console.log("encryptedPassword", encryptedPassword);

    // Create user in our database
    const user = await User.create({
      userName,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
    console.log("user", user);

    // Create token
    const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
      expiresIn: "2h",
    });
    console.log("token", token);

    // save user token
    user.token = token;
    console.log("user", user);

    // return new user
    res
      .status(200)
      .json({ userName: user.userName, email: user.email, id: user._id });
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    console.log("user", user, email);

    const Pass = await EncryptionUtil.audioPassword(password);
    const decryptedPass = await EncryptionUtil.audioAes256CbcDecryption(
      Pass.valueToBeDecrypted,
      Pass.encryptionKey,
      Pass.encrytionIV
    );
    console.log("decryptedPass222", decryptedPass);
    console.log("user.password", user.password);

    if (user && (await bcrypt.compare(decryptedPass, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
        expiresIn: "2h",
      });

      // save user token
      user.token = token;

      // user
      res
        .status(200)
        .json({ userName: user.userName, email: user.email, id: user._id });
      return;
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/user", async (req, res) => {
  try {
    // Get user input
    const jwttokenHeader = req.header("authorization").replace("Bearer ", "");

    if (!jwt.verify(jwttokenHeader, JWT_SECRECT)) {
      throw new Error("Token invalid");
    }
    const jwttoken = jwt.decode(jwttokenHeader);

    // Validate if user exist in our database
    const user = await User.findOne({ _id: jwttoken.user_id });
    if (!user) {
      throw new Error("user not exist");
    }
    const token = jwt.sign({ user_id: user._id }, JWT_SECRECT, {
      expiresIn: "2h",
    });
    user.token = token;

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.get("/dashboard", async (req, res) => {
  console.log("dashboard called");

  if (req.header("authorization")) {
    const jwttokenHeader = req.header("authorization").replace("Bearer ", "");

    if (!jwt.verify(jwttokenHeader, JWT_SECRECT)) {
      throw new Error("Token invalid");
    }
    const jwttoken = jwt.decode(jwttokenHeader);
    console.log("jwttoken dashboard", jwttoken);
  }

  res.status(200).json({
    tags: [],
    audios: [],
    playlists: [],
  });
});

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;
