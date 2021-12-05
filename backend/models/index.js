const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
const [User, Privilege] = require("./user.model.js")(sequelize, Sequelize)
db.Users = User
db.Privileges = Privilege
db.Posts = require("./post.model.js")(sequelize, Sequelize);
db.TextPosts = require("./textPost.model.js")(sequelize, Sequelize);
db.LinkPosts = require("./linkPost.model.js")(sequelize, Sequelize);
db.VideoPosts = require("./videoPost.model.js")(sequelize, Sequelize);
db.ImgPosts = require("./imgPost.model.js")(sequelize, Sequelize);
db.PostReactions = require("./postReaction.model.js")(sequelize, Sequelize);
db.Comments = require("./comment.model.js")(sequelize, Sequelize);

module.exports = db;