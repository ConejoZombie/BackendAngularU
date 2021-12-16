const { Schema, model } = require("mongoose");

const MateriaSchema = Schema({

    nombreMateria: {
        type: String,
        require: true
    },
    professorName: {
        type: String,
        require: true
    },
    horario: {
        type: String,
        require: true
    },
    cupos: {
        type: Number,
        require: true
    },
    grupo: {
        type: Number,
        require: true
    },
    createDay: {
        type: Date,
        default: Date.now
    }
   

});

module.exports = model('Materia', MateriaSchema); // se hace la exportacion (nombre del modelo en DB, mi esquema)