module.exports = (sequelize, Sequelize) => {
    const VideoPost = sequelize.define('VideoPost', {
      path: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subTitle: {
        type: Sequelize.STRING,
        allowNull: true
      },
      likes: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      dislikes: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    })
  
    return VideoPost;
};
  

  