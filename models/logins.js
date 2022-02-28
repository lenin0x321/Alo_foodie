'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class logins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      this.hasMany(Users,{foreignKey:'id'})
    }
  }
  logins.init({
    id: {
      type : DataTypes.STRING(64),
      allowNull:false,
      autoIncrement: true,
      unique:true
    },
    userid:{ 
      type: DataTypes.STRING(64),
      primaryKey:true,
      unique:true
    },
    successfullogin:{
      type: DataTypes.STRING(64),
      allowNull:false
    },
    failedlogin:{
      type: DataTypes.STRING(64),
    },
    invalidloginattempt:{
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, 
  {
    sequelize,
    modelName: 'logins',
  });
  return logins;
};