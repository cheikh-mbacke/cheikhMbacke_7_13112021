module.exports = (sequelize, Sequelize) => {
    const PostReaction = sequelize.define('PostReaction', {
      likes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      dislikes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      idPost: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      postType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    })
  
    return PostReaction;
};
  

  