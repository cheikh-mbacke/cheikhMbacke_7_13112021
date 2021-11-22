module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idTextPost: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      idVideoPost: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      idLinkPost: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    })
  
    return Post;
  };
  

  