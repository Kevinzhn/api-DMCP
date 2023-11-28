const mongoose = require("mongoose");

const DisciplinaSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    nome: {
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true,
    },
    instrutor: {
        type: String,
        required: true,
    }
});

const Disciplina = mongoose.model('Disciplina', DisciplinaSchema);

module.exports = Disciplina;