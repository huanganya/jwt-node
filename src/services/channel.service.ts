import db from "../config/database";

const Channel = db.channel;
const Profile = db.profile;
const Playlist = db.playlist;
const RelationList = db.relationlist;
const User = db.user;
const Op = db.Sequelize.Op;

export const save = async function (unique, ext) {
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
};

export const update = async function (
  data,
  thumbnailPath,
  canvasPath,
  user_id
) {
  return await Channel.update(
    {
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
      user_id: user_id,
    },
    {
      where: { unique: data.unique },
    }
  );
};

export const exist = async function (unique) {
  const item = await Channel.findAll({
    where: {
      unique: unique,
    },
  });
  return JSON.parse(JSON.stringify(item))[0];
};

export const getmovies = async function () {
  const data = await Channel.findAll();
  return JSON.parse(JSON.stringify(data));
};

export const getmymovies = async function (user_id) {
  const data = await Channel.findAll({
    where: {
      user_id: user_id,
    },
  });
  return JSON.parse(JSON.stringify(data));
};

export const getlist = async function (playlist_id) {
  const data = await RelationList.findAll({
    where: {
      playlist_id: playlist_id,
    },
  });
  return JSON.parse(JSON.stringify(data));
};

export const getprofile = async function (id) {
  Profile.hasOne(User, { foreignKey: "_id" });
  Profile.belongsTo(User, { foreignKey: "user_id", targetKey: "_id" });

  const data = Profile.findAll({
    where: { user_id: id },
    include: [{ model: User }],
  });
  return data;
};

export const saveprofile = async function (data, user_id) {
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
};

export const saveplaylist = async function (data, user_id) {
  return await Playlist.create({
    title: data.title,
    visibility: data.visibility,
    user_id: user_id,
  });
};

export const loadplaylist = async function (user_id) {
  const data = await Playlist.findAll({
    where: {
      user_id: user_id,
    },
  });
  return JSON.parse(JSON.stringify(data));
};

export const deleteplaylist = async function (id) {
  return await Playlist.destroy({
    where: {
      id: id,
    },
  });
};

export const addtoplaylist = async function (data, user_id) {
  return await RelationList.create({
    playlist_id: data.playlist_id,
    channel_id: data.channel_id,
    user_id: user_id,
    type: data.type,
  });
};

export const checkrelationitem = async function (data, user_id) {
  const item = await RelationList.findAll({
    where: {
      playlist_id: data.playlist_id,
      channel_id: data.channel_id,
      user_id: user_id,
    },
  });
  return JSON.parse(JSON.stringify(item))[0];
};

export const removefromplaylist = async function (id) {
  return await RelationList.destroy({
    where: {
      id: id,
    },
  });
};
