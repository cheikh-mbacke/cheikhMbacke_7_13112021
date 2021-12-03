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
      }
    })
  
    return VideoPost;
};
  

  