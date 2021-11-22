module.exports = (sequelize, Sequelize) => {
    const LinkPost = sequelize.define('LinkPost', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
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
  
    return LinkPost;
};
  

  