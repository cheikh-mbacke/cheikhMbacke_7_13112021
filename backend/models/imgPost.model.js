module.exports = (sequelize, Sequelize) => {
    const ImgPost = sequelize.define('ImgPost', {
        imgPath: {
            type: Sequelize.STRING,
            allowNull: false
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return ImgPost;
};


