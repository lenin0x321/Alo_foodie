'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class useraddresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Users}) {
      // define association here
      this.belongsTo(Users,{foreignKey:'userid', as: 'user'})
    }
    toJSON(){
      return {...this.get(), id:undefined,userid:undefined}
    }
  }
  useraddresses.init({
    id:{
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey:true
    },
    userid:{
      type:DataTypes.STRING(64)
    },
    name:{
      type: DataTypes.STRING(32)
    },
    addressline1:{
      type: DataTypes.STRING(128)
    },
    addressline2:{
      type: DataTypes.STRING(128)
    },
    city:{
      type: DataTypes.STRING(128)
    },
    state:{
      type: DataTypes.STRING(128)
    },
    city:{
      type: DataTypes.STRING(128)
    },
    landmark:{
      type: DataTypes.STRING(128)
    },
    district:{
      type: DataTypes.STRING(128)
    },
    state:{
      type: DataTypes.STRING(128)
    },
    country:{
      type: DataTypes.STRING(128)
    },
    pincode:{
      type: DataTypes.STRING(16)
    },
    latitude:{
      type: DataTypes.FLOAT
    },
    longitude:{
      type: DataTypes.FLOAT
    },
    status:{
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    createdby:{
      type: DataTypes.STRING(64),
      defaultValue: 'User'
    },
    updatedby:{
      type: DataTypes.STRING(64),
      defaultValue: 'User'
    }
  }, {
    sequelize,
    modelName: 'useraddresses',
  });
  return useraddresses;
};