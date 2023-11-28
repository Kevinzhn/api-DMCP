const mongoose = require('mongoose');

const connectDataBase = async () => {
    try {
        await mongoose.connect('mongodb+srv://kevin:05wIyku5ipUUMo1B@cluster0.detctjb.mongodb.net/?retryWrites=true&w=majority');
        console.log("MongoDB conectado!");
    } catch (error) {
        console.log("Erro ao conectar MongoDB!");
    }
}

module.exports = connectDataBase;