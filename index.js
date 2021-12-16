const express = require('express'); //importaciones en node.
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./db/config');
require('dotenv').config();

console.log( process.env );

// crear el servidor/aplicación de express
const app = express();

//Base de datos
dbConnection();

//directorio publico
app.use( express.static('public') );

//CORS
app.use( cors() );

//Lectura y parseo del body
app.use( express.json() );


// Rutas
app.use( '/api/materias', require('./routes/materias') );
app.use( '/api/clases', require('./routes/clases') );


//manejar demas rutas 
app.get( '*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html') );
})



app.listen( process.env.PORT, () => {
    console.log(`Servidor en puerto ${ process.env.PORT }`);
} ); 


