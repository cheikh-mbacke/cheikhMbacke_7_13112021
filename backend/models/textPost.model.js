module.exports = (sequelize, Sequelize) => {
    const TextPost = sequelize.define('TextPost', {
      content: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    return TextPost;
};
  

  