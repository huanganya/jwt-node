import jwt = require("jsonwebtoken");

const config = process.env;
const JWT_SECRECT = "tokey_key";

const verifyToken = (req, res, next) => {
  if (!req.header("authorization")) {
    return res.status(401).send("Invalid Token");
  }
  const token = req.header("authorization").replace("Bearer ", "");
  // req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRECT /*config.TOKEN_KEY*/);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
