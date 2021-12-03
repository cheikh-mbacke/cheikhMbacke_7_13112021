module.exports = (sequelize, Sequelize) => {
    const LinkPost = sequelize.define('LinkPost', {
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    return LinkPost;
};
  

  