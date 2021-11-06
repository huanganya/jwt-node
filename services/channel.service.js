const db = require("../config/database");
const Channel = db.channel;
const Profile = db.profile;
const Playlist = db.playlist;
const RelationList = db.relationlist;
const User = db.user;
const Op = db.Sequelize.Op;

exports.save = async function(unique, ext) {
    return await Channel.create({
        unique: unique,
        media: unique + "-media." + ext,
        title: "",
        description: "",
        category: "",
        thumbnail: "",
        playercanvas: "",
        subtitle: "",
        playlist: "",
        keywords: "",
        mins: "",
        size: "",
        user_id: -1,
    });
}

exports.update = async function (data, thumbnailPath, canvasPath, user_id) {
    return await Channel.update({
        title: data.title,
        description: data.description,
        category: data.category,
        thumbnail: thumbnailPath,
        playercanvas: canvasPath,
        subtitle: data.subtitle,
        playlist: data.playlist,
        size: data.size,
        mins: data.mins,
        keywords: data.keywords,
        user_id: user_id, },
    {
        where: {unique: data.unique}
    });
}

exports.exist = async function (unique) {
    const item = await Channel.findAll({
        where: {
            unique: unique
        }
    })
    return JSON.parse(JSON.stringify(item))[0];
}

exports.getmovies = async function () {
    const data = await Channel.findAll();
    return JSON.parse(JSON.stringify(data));
}

exports.getmymovies = async function (user_id) {
    const data = await Channel.findAll({
        where: {
            user_id: user_id,
        }
    });
    return JSON.parse(JSON.stringify(data));
}

exports.getlist = async function(playlist_id) {
    const data = await RelationList.findAll({
        where: {
            playlist_id: playlist_id,
        }
    });
    return JSON.parse(JSON.stringify(data));
}

exports.getprofile = async function (id) {
    Profile.hasOne(User, {foreignKey : '_id'});
    Profile.belongsTo(User, {foreignKey : 'user_id', targetKey: '_id'})

    const data = Profile.findAll({
        where: {user_id: id},
        include: [{model:User}]
    });
    return data;
}

exports.saveprofile = async function(data, user_id) {
    return await Profile.create({
        user_id: user_id,
        firstname: data.first,
        lastname: data.last,
        phone: data.phone,
        country: data.country,
        city: data.city,
        zipcode: data.zipcode,
        state: data.state,
        address: data.address,
    });
}

exports.saveplaylist = async function(data, user_id) {
    return await Playlist.create({
        title: data.title,
        visibility: data.visibility,
        user_id: user_id,
    });
}

exports.loadplaylist = async function(user_id) {
    const data = await Playlist.findAll({
        where: {
            user_id: user_id,
        }
    })
    return JSON.parse(JSON.stringify(data));
}

exports.deleteplaylist = async function(id) {
    return await Playlist.destroy({
        where: {
            id: id,
        }
    });
}

exports.addtoplaylist = async function(data, user_id) {
    return await RelationList.create({
        playlist_id: data.playlist_id,
        channel_id: data.channel_id,
        user_id: user_id,
        type: data.type,
    });
}

exports.checkrelationitem = async function(data, user_id) {
    const item = await RelationList.findAll({
        where: {
            playlist_id: data.playlist_id,
            channel_id: data.channel_id,
            user_id: user_id,
        }
    })
    return JSON.parse(JSON.stringify(item))[0];
}

exports.removefromplaylist = async function(id) {
    return await RelationList.destroy({
        where: {
            id: id,
        }
    });
}