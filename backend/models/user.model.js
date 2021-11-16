module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true ,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  return User;
};



/*
const User = function(user) {
    this.pseudo = user.pseudo;
    this.email = user.email;
    this.password = user.password;
};*/

