const { Router } = require('express');
const ProdutosController = require('../controllers/ProdutosController');

const router = Router()

router.get('/produtos', ProdutosController.tabelaProdutos) // Traz a tabela de produtos
router.get('/produtos/:id', ProdutosController.listarUmProduto) // Traz um produto diante do id
router.get('/semestoque', ProdutosController.tabelaProdutosSemEstoque) // traz os produtos sem estoque

router.post('/produtos', ProdutosController.criaProduto) // cria produto para a tabela

router.put('/produtos/:id', ProdutosController.editaProduto) // edita produto na tabela

router.delete('/produtos/:id', ProdutosController.removerProduto) // remove um produto da tabela

module.exports = router