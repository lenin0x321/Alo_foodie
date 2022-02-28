'use strict';
const {
  Model
} = require('sequelize');
const { ThisMonthList } = require('twilio/lib/rest/api/v2010/account/usage/record/thisMonth');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({logins,useraddresses}) {
      // define association here
      this.belongsTo(logins,{foreignKey:'id'})
      this.hasMany(useraddresses,{foreignKey:'userid',as:'useraddresses'})
    }
  }
  Users.init({
    id: {
      type: DataTypes.STRING(64),
      unique:true,
      primaryKey:true
    },
    firstname: {
      type: DataTypes.STRING(64)
    },
    lastname: {
      type: DataTypes.STRING(64)
    },
    phone: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING(8)
    },
    dateofbirth: {
      type: DataTypes.DATEONLY
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createdby: {
      type: DataTypes.STRING(64),
      defaultValue: "User"
    },
    updatedby: {
      type: DataTypes.STRING,
      defaultValue: "User"
    },
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};