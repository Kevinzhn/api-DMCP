const express = require('express');
const connectDataBase = require('./database');

const alunoRouter = require('./routes/aluno');
const disciplinaRouter = require('./routes/disciplina');



const app = express();
app.use(express.json());

connectDataBase();

app.use('/aluno', alunoRouter);
app.use('/disciplina', disciplinaRouter);

const port = 3000;
app.listen(port, () => {
    console.log("App running!")
});