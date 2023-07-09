const  NaoEncontrado  = require('../error/naoEncontrado.js');
const  erroValidacao  = require('../error/validationError.js')
const { ValidationError } = require('sequelize');
const database = require('../models');

class ProdutosController {

    static async tabelaProdutos(req, res){ // retornamos a tabela de produtos criados na database
        try {
            const produtos = await database.Produtos
                .findAll()
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async tabelaProdutosSemEstoque(req, res){
        try {
            const produtosForaDeEstoque = await database.Produtos
                .scope('semEstoque')
                .findAll();
            if(produtosForaDeEstoque == ""){
                return res.status(200).json(new NaoEncontrado("Nenhum produto fora de estoque."))
            }else{
                return res.status(200).json(produtosForaDeEstoque);
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaProduto(req, res){ // criamos um produto
        const produto = req.body
        try {
            const produtoCriado = await database.Produtos.create(produto)

            if(produtoCriado !== null){
                return res.status(200).json(produtoCriado);
            }else{
                return res.status(500).json(new erroValidacao())
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async editaProduto(req, res, next){ // editamos um produto
        const produtoAtualizar = req.body
        const { id } = req.params
        try {
            await database.Produtos.update(produtoAtualizar, { where: {
                id: Number(id)
            }})
            const produtoAtualizado = await database.Produtos.findOne({ where: { id: Number(id) } })
            
            // caso nenhum produto tenha sido atualizado
            if(produtoAtualizado !== null){
                return res.status(200).json(produtoAtualizado);
            }else{
                return res.status(404).json(new NaoEncontrado("id do produto não localizado."))
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    static async listarUmProduto(req, res){ // listamos um produto diante do id.
        const { id } = req.params
        try {
            const produto = await database.Produtos.findOne({ where: { id: Number(id) } })
            if(produto !== null){
                return res.status(200).json(produto);
            }else{
                return res.status(404).json(new NaoEncontrado("Id do produto não encontrado."));
            }
        
        } catch (error) {
            return res.status(500).json(error.message);
        } 
    }

    static async removerProduto(req, res){ // deletando um produto...
        const { id } = req.params;
        try {
            await database.Produtos.destroy({ where: { id: Number(id) } });
            const produtoRemovido = await database.Produtos.findOne({ where: { id: Number(id) } });
            if(produtoRemovido !== null){
                return res.status(404).json(new NaoEncontrado("o produto não foi removido."))
            }else{
                return res.status(200).json({message: "Produto deletado com sucesso. "});
            }
            
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ProdutosController;