const { response } = require('express');
const Materia = require('../models/Materias');

const obtenerMaterias = async (resq, res = response) => {

    try {

        const materiasDb = await Materia.find();

        console.log(materiasDb);

        if (!materiasDb) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen registros.!'
            });
        };


        return res.status(201).json({
            materiasDb
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

};

// const obtenerMateria = async (resq, res = response) => {

//     try {

//         const materiaDb = await Materia.findById(resq.params.id);

//          if (!materiaDb) {
//             return res.status(400).json({
//                 ok: false,
//                 msg: 'No existen registros.!'
//             });
//         };


//         return res.status(201).json({
//             materiaDb
//         });

//     } catch (err) {

//         console.log(err);

//         return res.status(500).json({
//             ok: false,
//             msg: 'Por favor hable con el administrador'
//         });

//     }

// };

const crearMateria = async (resq, res = response) => {

    const { nombreMateria, professorName, horario, cupos, grupo } = resq.body;


    try {

        const materiaDb = await Materia.findOne({ nombreMateria, grupo });

        if (materiaDb) {

            return res.status(400).json({
                ok: false,
                msg: 'La materia ya existe con ese grupo.!'
            });

        };

        const dbMateria = new Materia(resq.body);

        await dbMateria.save();

        return res.status(201).json({
            ok: true,
            nombreMateria,
            professorName,
            mId: dbMateria.id,
            horario,
            cupos,
            grupo
        });


    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }


};

const editarMateria = async (resq, res = response) => {

    const { horario, professorName, cupos, grupo } = resq.body;


    try {

        const materiaDb = await Materia.findById(resq.params.id);

        if (!materiaDb) {
            return res.status(400).json({
                ok: false,
                msg: 'La materia no existe.!'
            });
        };

        materiaDb.professorName = professorName;
        materiaDb.horario = horario;
        materiaDb.cupos = cupos;
        materiaDb.grupo = grupo;

        await materiaDb.save();

        return res.status(201).json({
            ok: true,
            professorName,
            horario,
            cupos,
            grupo

        });


    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }


};

const borrarMateria = async (resq, res = response) => {


    try {

        const materiaDb = await Materia.findById(resq.params.id);

        if (!materiaDb) {
            return res.status(400).json({
                ok: false,
                msg: 'La materia no existe.!'
            });
        };

        await Materia.findByIdAndDelete(resq.params.id);

        return res.status(201).json({
            ok: true,
            msg: 'La materia se elimino con exito.!'

        });


    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }


};




module.exports = {
    crearMateria,
    obtenerMaterias,
    editarMateria,
    borrarMateria
}