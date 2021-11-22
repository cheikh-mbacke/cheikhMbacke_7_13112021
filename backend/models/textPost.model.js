module.exports = (sequelize, Sequelize) => {
    const TextPost = sequelize.define('TextPost', {
      content: {
        type: Sequelize.STRING,
        allowNull: false
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
  
    return TextPost;
};
  

  