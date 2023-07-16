const bodyParser = require('body-parser');
const produtos = require('../routes/produtosRouter');

module.exports = app => {
    app.use(bodyParser.json())
    app.use(produtos)
}