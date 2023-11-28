const express = require('express');
const Disciplina = require('../models/disciplina');
const { default: mongoose } = require('mongoose');

const router = express.Router();

//Registrar uma disciplina
router.post("/registrar", async (req, res) => {
    try {
        const { id, nome, horario, instrutor } = req.body;
        const disciplina = new Disciplina({ id, nome, horario, instrutor });
        await disciplina.save();
        return res.send(disciplina);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
            return res.send("Id duplicado!");
        }
        else if (error.errors && error.errors.id) {
            return res.send('O campo id é obrigatório!');
        }
        else if (error.errors && error.errors.nome) {
            return res.send('O campo nome é obrigatório!');
        }
        else if (error.errors && error.errors.horario) {
            return res.send('O campo horario é obrigatório!');
        }
        else if (error.errors && error.errors.instrutor) {
            return res.send('O campo instrutor é obrigatório!');
        }
        else {
            return res.send("Erro ao registrar disciplina!\n" + error);
        }

    }

});

//Atualizar uma disciplina
router.put("/atualizar", async (req, res) => {
    try {
        const { id, nome, horario, instrutor } = req.body;
        const disciplina = await Disciplina.findOne({ id });
        if (!disciplina) {
            return res.send("Disciplina não existe");
        }
        disciplina.nome = nome;
        disciplina.horario = horario;
        disciplina.instrutor = instrutor;
        await disciplina.save();
        return res.send(disciplina);
    } catch (error) {
        if (error.errors && error.errors.id) {
            return res.send('O campo id é obrigatório!');
        }
        else if (error.errors && error.errors.nome) {
            return res.send('O campo nome é obrigatório!');
        }
        else if (error.errors && error.errors.horario) {
            return res.send('O campo horario é obrigatório!');
        }
        else if (error.errors && error.errors.instrutor) {
            return res.send('O campo instrutor é obrigatório!');
        }
        else {
            return res.send("Erro ao atualizar disciplina!\n" + error);
        }

    }

});

//Deletar uma disciplina
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const disciplina = await Disciplina.findOneAndDelete({ id })
            .select('-_id -__v');;
        if (!disciplina) {
            return res.send("Disciplina não encontrodA!");
        }
        return res.send(disciplina);
    } catch (error) {
        return res.send("Erro ao deletar disciplina!");
    }
});

//Listar todas os disciplinas
router.get("", async (req, res) => {
    try {
        const disciplinas = await Disciplina.find()
            .select('-_id -__v');
        if (!disciplinas) {
            return res.send("Lista vazia!");
        }
        return res.send(disciplinas);
    } catch (error) {
        console.log(error);
        return res.send("Erro ao listar disciplinas!");
    }
});

//Consultar uma disciplina
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const disciplina = await Disciplina.findOne({ id })
            .select('-_id -__v');
        if (!disciplina) {
            return res.send("Disciplina não encontroda!");
        }
        return res.send(disciplina);
    } catch (error) {
        return res.send("Erro ao consultar disciplina!");
    }
});

module.exports = router;