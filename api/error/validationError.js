const RequisicaoIncorreta = require("./requisicaoIncorreta.js");

class erroValidacao extends RequisicaoIncorreta{
    constructor(erro){
        const mensagensErro = Object.values(erro.errors)
            .map(erro => erro.message)
            .join("; ");  
        super(`os seguintes erros foram encontrados: ${mensagensErro}`);
    }
}

module.exports = erroValidacao;