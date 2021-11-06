const db = require("../config/database");
const User = db.user;
const Op = db.Sequelize.Op;

exports.isUserExistE = async function (email) {
    const user = await User.findAll({
        where: {
            email: email
        }
    })
    return JSON.parse(JSON.stringify(user))[0];
}

exports.isUserExist = async function (email, username) {
    const user = await User.findAll({
        where: {
            username: username,
            email: email
        }
    });
    return JSON.parse(JSON.stringify(user))[0];
}

exports.createUser = async function (json) {
    const {username, email, password} = json;
    return await User.create({
        username,
        email: email.toLowerCase(), // Sanitize: convert email to lowercase
        password: password,
        withlogin: 0,
    });
}

exports.isGoogleUser = async function (email, username) {
    const user = await User.findAll({
        where: {
            username: username,
            email: email,
            withlogin: 1,
        }
    });
    return JSON.parse(JSON.stringify(user))[0];
}

exports.createGoogleUser = async function (email, username) {
    return await User.create({
        username,
        email: email.toLowerCase(), // Sanitize: convert email to lowercase
        password: "without",
        withlogin: 1,
    });
}
