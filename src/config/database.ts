import { Sequelize } from "sequelize";
import user from "../models/user.model";
import channel from "../models/channel.model";
import profile from "../models/profile.model";
import playlist from "../models/playlist.model";
import relationlist from "../models/relationlist.model";

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

const db = {} as any;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = user(sequelize, Sequelize);
db.channel = channel(sequelize, Sequelize);
db.profile = profile(sequelize, Sequelize);
db.playlist = playlist(sequelize, Sequelize);
db.relationlist = relationlist(sequelize, Sequelize);

export default db;
