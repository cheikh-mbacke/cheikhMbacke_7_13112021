module.exports = (sequelize, Sequelize) => {
    const VideoPost = sequelize.define('VideoPost', {
      videoPath: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true
      }
    })
  
    return VideoPost;
};
  

  