const ErroBase = require("./erroBase.js");

class NaoEncontrado extends ErroBase {
    constructor(mensagem = "não foi encontrado.") {
        super(mensagem, 404);
    }
}

module.exports = NaoEncontrado;