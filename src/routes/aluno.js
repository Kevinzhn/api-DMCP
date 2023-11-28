//Listar todos os alunos
const express = require('express');
const mongoose = require('mongoose');
const Aluno = require('../models/aluno')
const Disciplina = require('../models/disciplina')

const router = express.Router();

router.get("", async (req, res) => {
    try {
        const alunos = await Aluno.find()
            .populate({
                path: 'disciplinas.disciplina',
                select: '-_id -__v'
            })//Mostrar completamente o campo disciplinas
            .select('-_id -__v');//Esconder _id e __v de mongoose 
        if (!alunos) {
            return res.send("Lista vazia!");
        }
        return res.send(alunos);
    } catch (error) {
        return res.send("Erro ao listar alunos!\n" + error);
    }
});

//Registrar um aluno
router.post("/registrar", async (req, res) => {
    try {
        const { cpf, nome, matricula } = req.body;
        const aluno = new Aluno({ cpf, nome, matricula });
        await aluno.save();
        return res.send(aluno);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.cpf) {
            return res.send("CPF duplicado!");
        }
        else if (error.code === 11000 && error.keyPattern && error.keyPattern.matricula) {
            return res.send('Matrícula duplicada!');
        }
        else if (error.errors && error.errors.matricula) {
            return res.send('O campo matrícula é obrigatório!');
        }
        else if (error.errors && error.errors.cpf) {
            return res.send('O campo cpf é obrigatório!');
        }
        else if (error.errors && error.errors.nome) {
            return res.send('O campo nome é obrigatória!');
        }
        else {
            return res.send(error);
        }

    }
});

//Consultar um aluno
router.get("/:matricula", async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const aluno = await Aluno.findOne({ matricula })
            .populate({
                path: 'disciplinas',
                select: '-_id -__v'
            })//Mostrar completamente o campo disciplinas
            .select('-_id -__v');//Esconder _id e __v de mongoose 
        if (!aluno) {
            return res.send("Aluno não encontrado!");
        }
        return res.send(aluno);
    } catch (error) {
        return res.send("Erro ao consultar aluno!");
    }
});

//Deletar um aluno
router.delete("/:matricula", async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const aluno = await Aluno.findOneAndDelete({ matricula });
        if (!aluno) {
            return res.send("Aluno não encontrado!");
        }
        return res.send(aluno);
    } catch (error) {
        return res.send("Erro ao deletar aluno!");
    }

});

//Matricular uma disciplina
router.put("/:matricula", async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const aluno = await Aluno.findOne({ matricula });
        if (!aluno) {
            return res.send("Aluno não encontrado!");
        }
        const id = req.body.id;
        const disciplina = await Disciplina.findOne({ id });
        if (!disciplina) {
            return res.send("Disciplina não encontroda!");
        }
        const inscricaoDuplicada = aluno.disciplinas.some((d) => {
            return d._id.toString() === disciplina._id.toString();
        });
        if (inscricaoDuplicada) {
            return res.send("Disciplina já está matriculada!");
        }
        aluno.disciplinas.push(disciplina);
        await aluno.save();
        return res.send(aluno);
    } catch (error) {
        return res.send("Erro ao matricular disciplina!");
    }
});

//trancar uma disciplina
router.put("/:matricula/trancar", async (req, res) => {
    try {
        const matricula = req.params.matricula;
        const aluno = await Aluno.findOne({ matricula });
        if (!aluno) {
            return res.send("Aluno não encontrodo!");
        }
        const id = req.body.id;
        const disciplina = await Disciplina.findOne({ id });
        if (!disciplina) {
            return res.send("Disciplina não encontroda!");
        }
        const antesFiltroMatriculada = aluno.disciplinas.length;
        aluno.disciplinas = aluno.disciplinas.filter((d) => {
            return d._id.toString() !== disciplina._id.toString()
        });
        const depoisFiltroMatriculada = aluno.disciplinas.length;
        if (antesFiltroMatriculada == depoisFiltroMatriculada) {
            return res.send("Disciplina já está trancada ou não matriculada!");
        }
        await aluno.save();
        return res.send(aluno);
    } catch (error) {
        return res.send("Erro ao trancar disciplina!");
    }
});

module.exports = router;