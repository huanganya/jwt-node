var channelService = require('../services/channel.service');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require('../app');

const getUserID = function(req) {
    let user_id = -1;

    if (req.header("authorization")) {
        const JWT_SECRECT = "tokey_key";
        const jwttokenHeader = req.header("authorization").replace("Bearer ", "");
    
        if (!jwt.verify(jwttokenHeader, JWT_SECRECT)) {
            throw new Error("Token invalid");
        }
        const jwttoken = jwt.decode(jwttokenHeader);
        user_id = jwttoken.user_id;
    }

    return user_id;
}

exports.upload = async function(req, res) {
    // const JWT_SECRECT = "tokey_key";
    
    // if (req.header("authorization")) {
    //     const jwttokenHeader = req.header("authorization").replace("Bearer ", "");

    //     if (!jwt.verify(jwttokenHeader, JWT_SECRECT)) {
    //         throw new Error("Token invalid");
    //     }
    //     const jwttoken = jwt.decode(jwttokenHeader);

    //     res.send(200).send(jwttoken);
    //     console.log("jwttoken dashboard", jwttoken);
    // }
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const item = await channelService.exist(req.body.unique);
    if (item) {
      return res.status(200).send("Exist");
    }

    const uploadedFile = req.files.file;
    const ext = uploadedFile.name.split('.').pop();
    const uploadPath = global.publicPath + '/' + req.body.unique + "-media." + ext;
    const err = await uploadedFile.mv(uploadPath);
    if(err) {
        return res.status(500).send(err);
    }

    const data = await channelService.save(req.body.unique, ext);

    return res.status(200).send("Upload Success");
}

exports.setinfomations = async function(req, res) {
    try {
        let uploadedFile = req.files.thumbnail, thumbnailPath = "", canvasPath = "";
        if(uploadedFile) {
            const fileName = req.files.thumbnail.name;
            const ext = fileName.split('.').pop();
            thumbnailPath = req.body.unique + "-thumbnail." + ext;
            const uploadPath = global.publicPath + '/';
            let err = await uploadedFile.mv(uploadPath + thumbnailPath);
            // if(err) {
            //     return res.status(500).send(err);
            // }
        }

        uploadedFile = req.files.canvas;
        if(uploadedFile) {
            const fileName = req.files.canvas.name;
            const ext = fileName.split('.').pop();
            canvasPath = req.body.unique + "-canvas." + ext;

            const uploadPath = global.publicPath + '/';
            let err = await uploadedFile.mv(uploadPath + canvasPath);
            // if(err) {
            //     return res.status(500).send(err);
            // }
        }

        const data = await channelService.update(req.body, thumbnailPath, canvasPath, getUserID(req));

        return res.status(200).send("Success");
    } catch(err) {
        return res.status(500).send(err);
    }
}

exports.getmovies = async function(req, res) {
    try {
        const data = await channelService.getmovies();
        return res.status(200).send(data);
    } catch(err) {
        return res.status(500).send(err);
    }
}

exports.getmymovies = async function(req, res) {
    try {
        const data = await channelService.getmymovies(getUserID(req));
        return res.status(200).send(data);
    } catch(err) {
        return res.status(500).send(err);
    }
}

exports.getlist = async function(req, res) {
    try {
        const data = await channelService.getlist(req.body.id);
        return res.status(200).send(data);
    } catch(err) {
        return res.status(500).send(err);
    }
}

exports.getprofile = async function(req, res) {
    try {
        const data = await channelService.getprofile(getUserID(req));
        console.log(data)
        return res.status(200).send(data);
    } catch(err) {
        return res.status(500).send(err);
    }
}

exports.saveprofile = async function(req, res) {
    try {
        const data = await channelService.saveprofile(req.body, getUserID(req));
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.saveplaylist = async function(req, res) {
    try {
        const data = await channelService.saveplaylist(req.body, getUserID(req));
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.loadplaylist = async function(req, res) {
    try {
        const data = await channelService.loadplaylist(getUserID(req));
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.deleteplaylist = async function(req, res) {
    try {
        const data = await channelService.deleteplaylist(req.body.id);
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.addtoplaylist = async function(req, res) {
    try {
        const exist = await channelService.checkrelationitem(req.body, getUserID(req));
        if(exist) {
            return res.status(200).send("Exist");
        }
        const data = await channelService.addtoplaylist(req.body, getUserID(req));
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send(err);
    }
}

exports.removefromplaylist = async function(req, res) {
    try {
        const data = await channelService.removefromplaylist(req.body.id);
        return res.status(200).send("Success");
    } catch (err) {
        return res.status(500).send(err);
    }
}