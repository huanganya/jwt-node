var channelService = require('../services/channel.service');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require('dotenv');

const JWT_SECRECT = "tokey_key";

exports.download = async function(req, res) {

}