module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('Post', {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      idPost: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      postType: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    return Post;
  };
  

  