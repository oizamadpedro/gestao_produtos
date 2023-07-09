'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Produtos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Produtos.init({
    produto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fornecedor: DataTypes.STRING,
    quantidade: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Produtos',
    scopes: {
      semEstoque: {
        where: {
          quantidade: "0"
        }
      }
    }
  });
  return Produtos;
};