const database = require('../models');

class ProdutosController{


    static async tabelaProdutos(req, res){ // retornamos a tabela de produtos criados na database
        try {
            const produtos = await database.Produtos.findAll(); 
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    static async criaProduto(req, res){ // criamos um produto
        const produto = req.body
        try {
            const produtoCriado = await database.Produtos.create(produto) 
            return res.status(200).json(produtoCriado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    static async editaProduto(req, res){ // editamos um produto
        const produtoAtualizar = req.body
        const { id } = req.params
        try {
            await database.Produtos.update(produtoAtualizar, { where: {
                id: Number(id)
            }})
            const produtoAtualizado = await database.Produtos.findOne({ where: { id: Number(id) } })
            return res.status(200).json(produtoAtualizado);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }


    static async listarUmProduto(req, res){ // listamos um produto diante do id.
        const { id } = req.params
        try {
            const produto = await database.Produtos.findOne({ where: { id: Number(id) } })
            return res.status(200).json(produto);
        } catch (error) {
            return res.status(500).json(error.message);
        } 
    }

    static async removerProduto(req, res){
        const { id } = req.params;
        try {
            await database.Produtos.destroy({ where: { id: Number(id) } });
            return res.status(200).json({message: "Produto deletado com sucesso. "});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = ProdutosController;