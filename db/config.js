const Mongoose = require("mongoose");


const dbConnection = async() => {

    try {
        
        await Mongoose.connect( process.env.BD_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar DB');
    }

}


module.exports = {
    dbConnection
};