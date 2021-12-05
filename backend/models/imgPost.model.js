module.exports = (sequelize, Sequelize) => {
    const ImgPost = sequelize.define('ImgPost', {
        path: {
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


