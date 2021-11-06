const Sequelize = require("sequelize");
const host = "localhost";
const port = 5432;
const username = "anyahuang";
const password = "";
const dbname = "audioapp";
const dialect = "postgres";
const pool = { max: 5, min: 0, acquire: 30000, idle: 10000 };

const sequelize = new Sequelize(dbname, username, password, {
  host: host,
  dialect: dialect,

  pool: {
    max: pool.max,
    min: pool.min,
    acquire: pool.acquire,
    idle: pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.channel = require("../models/channel.model")(sequelize, Sequelize);
db.profile = require("../models/profile.model")(sequelize, Sequelize);
db.playlist = require("../models/playlist.model")(sequelize, Sequelize);
db.relationlist = require("../models/relationlist.model")(sequelize, Sequelize);

module.exports = db;
