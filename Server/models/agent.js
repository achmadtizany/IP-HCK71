'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Agent.init({
    agentName: DataTypes.STRING,
    nickName: DataTypes.STRING,
    description: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    agentRole: DataTypes.STRING,
    agentDescription: DataTypes.STRING,
    abilities: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};