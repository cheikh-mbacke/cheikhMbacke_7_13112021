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
    },
    birthDate: {
      type: Sequelize.DATE,
      allowNull: true
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    avatarPath: {
      type: Sequelize.STRING,
      allowNull: true
    }
  })

  return User;
};

