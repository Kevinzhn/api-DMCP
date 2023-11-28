const mongoose = require("mongoose");

const AlunoSchema = mongoose.Schema({
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
    },
    matricula: {
        type: String,
        required: true,
        unique: true
    },
    disciplinas: [{
        disciplina: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Disciplina'
        },
        ponto: {
            type: Number,
            default: null
        }

    }]
});

const Aluno = mongoose.model('Aluno', AlunoSchema);

module.exports = Aluno;