const mongoose = require('mongoose');

const connectDataBase = async () => {
    try {
        await mongoose.connect('your-link');
        console.log("MongoDB conectado!");
    } catch (error) {
        console.log("Erro ao conectar MongoDB!");
    }
}

module.exports = connectDataBase;
