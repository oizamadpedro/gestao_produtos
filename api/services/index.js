const database = require('../models');
const Sequelize = require('sequelize');

class Services{

    static async criaProduto(produto){
        return database.Produtos.create(produto);
    }
    
    static async procuraProduto() {
        return database.Produtos.findAll()
    }

    static async atualizaProduto(produtoAtualizar, id){
        return database.Produtos.update(produtoAtualizar, {
            where: {
                id: Number(id)
            }
        })
    }
    
    static async procuraProdutoSemEstoque(){
        return database.Produtos
            .scope('semEstoque')
            .findAll();
    }

    static async destruirProduto(id){
        return database.Produtos.destroy({ where: { id: Number(id) } });
    }

    static async listarUmProduto(id){
        return database.Produtos.findOne({ where: { id: Number(id) } });
    }

}



module.exports = Services;