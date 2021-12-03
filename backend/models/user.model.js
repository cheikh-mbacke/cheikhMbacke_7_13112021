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

  const Privilege = sequelize.define('Privilege', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })

  User.hasMany(Privilege, {foreignKey: 'id'})
  Privilege.belongsTo(User, {foreignKey: 'userId'})

  return [User, Privilege];
};

