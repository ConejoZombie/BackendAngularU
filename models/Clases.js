const { Schema, model } = require("mongoose");

const ClaseSchema = Schema({

    studentName: {
        type: String,
        require: true
    },
    nombreMateria: {
        type: String,
        require: true
    },
    professorName: {
        type: String,
        require: true
    },
    idMateria: {
        type: String,
        require: true
    },
    nota1: {
        type: Number,
        require: false
    },
    nota2: {
        type: Number,
        require: false
    },
    nota3: {
        type: Number,
        require: false
    },
    createDay: {
        type: Date,
        default: Date.now
    }

});

module.exports = model('Clase', ClaseSchema); // se hace la exportacion (nombre del modelo en DB, mi esquema)