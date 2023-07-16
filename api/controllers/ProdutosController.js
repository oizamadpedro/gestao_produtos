const NaoEncontrado  = require('../error/naoEncontrado.js');
const erroValidacao  = require('../error/validationError.js')
const Services = require('../services');

class ProdutosController {
    static async tabelaProdutos(req, res){ // retornamos a tabela de produtos criados na database
        try {
            const produtos = await Services.procuraProduto();
            return res.status(200).json(produtos);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async tabelaProdutosSemEstoque(req, res){
        try {
            const produtosForaDeEstoque = await Services.procuraProdutoSemEstoque()
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
            const produtoCriado = await Services.criaProduto(produto);

            if(produtoCriado !== null){
                return res.status(200).json(produtoCriado);
            }else{
                return res.status(500).json(new erroValidacao())
            }
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async editaProduto(req, res){ // editamos um produto
        const produtoAtualizar = req.body
        const { id } = req.params
        try {
            await Services.atualizaProduto(produtoAtualizar, id)
            const produtoAtualizado = await Services.listarUmProduto(id)
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
            const produto = await Services.listarUmProduto(id);
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
            await Services.destruirProduto(id)
            const produtoRemovido = await Services.listarUmProduto(id)

            if(produtoRemovido !== null){
                return res.status(404).json(new NaoEncontrado("o produto não foi removido."))
            }else{
                return res.status(200).json({message: "Produto deletado com sucesso."});
            }
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = ProdutosController;