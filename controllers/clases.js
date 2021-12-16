const { response } = require('express');
const Clases = require('../models/Clases');
const Materia = require('../models/Materias');


const obtenerClases = async (resq, res = response) => {

    try {

        const clasesDB = await Clases.find();

        console.log(clasesDB);

        if (!clasesDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existen registros.!'
            });
        };


        return res.status(201).json({
            clasesDB
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

};


const crearClase = async ( resq, res = response) => {

    const { studentName, idMateria, nota1, nota2, nota3 } = resq.body;


    try {

        const materiaDb = await Materia.findById(idMateria);

        if (materiaDb.cupos > 0) {
            
            const claseDB = await Clases.findOne({ studentName, idMateria });
    
            if (claseDB) {
    
                return res.status(400).json({
                    ok: false,
                    msg: 'Este alumno ya se registro en esa materia.!'
                });
    
            };   
            
            const dbClase = new Clases(resq.body);
            dbClase.professorName = materiaDb.professorName;
            dbClase.nombreMateria = materiaDb.nombreMateria;
            materiaDb.cupos = materiaDb.cupos - 1;
            
            await materiaDb.save();
            await dbClase.save();
    
            return res.status(201).json({
                ok: true,
                studentName,
                _id: dbClase.id,
                idMateria,
                nombreMateria: materiaDb.nombreMateria,
                professorName: materiaDb.professorName,
                nota1,
                nota2,
                nota3
            });


        }else {

            return res.status(400).json({
                ok: false,
                msg: 'La materia no cuenta con cupo suficiente.!'
            });

        }

        
    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }

};

const editarClase = async (resq, res = response) => {

    const { nota1, nota2, nota3 } = resq.body;


    try {

        const claseDb = await Clases.findById(resq.params.id);

        if (!claseDb) {
            return res.status(400).json({
                ok: false,
                msg: 'La clase no existe.!'
            });
        };

       claseDb.nota1 = nota1;
       claseDb.nota2 = nota2;
       claseDb.nota3 = nota3;


        await claseDb.save();

        return res.status(201).json({
            ok: true,
            nota1,
            nota2,
            nota3

        });


    } catch (err) {

        console.log(err);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });

    }


};

const borrarClase = async (resq, res = response) => {


    try {

        const claseDb = await Clases.findById(resq.params.id);
        
        if (!claseDb) {
            return res.status(400).json({
                ok: false,
                msg: 'La clase no existe.!'
            });
        };
        
        const materiaDb = await Materia.findById(claseDb.idMateria);
        materiaDb.cupos = materiaDb.cupos + 1;
        
        await materiaDb.save()
        await Clases.findByIdAndDelete(resq.params.id);

        return res.status(201).json({
            ok: true,
            msg: 'La clase se elimino con exito.!'

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
    obtenerClases,
    crearClase, 
    editarClase,
    borrarClase
}


























