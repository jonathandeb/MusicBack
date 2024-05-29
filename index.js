require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { dbConnection } = require('./database/config');
const { initializeApp } = require('firebase/app');
const { firebaseConfig } = require('./database/firebase.config');
const port = process.env.PORT || 3000
//Crear servidor de express
const app = express();
//Configurar cors
app.use(cors());

//Carpeta publica
app.use(express.static('public'))

//Lectura y parseo del body
app.use(express.json());


//Base de datos
dbConnection();
initializeApp(firebaseConfig);
//Rutas

app.use( '/api/login', require('./routes/auth.routes') )
app.use( '/api/friends', require('./routes/friends.routes') )
app.use( '/api/usuarios', require('./routes/usuarios.routes') )
app.use( '/api/albums', require('./routes/albums.routes') )
app.use( '/api/bands', require('./routes/bands.routes') )
app.use( '/api/uploads', require('./routes/uploads.routes') )
app.use( '/api/posts', require('./routes/posts.routes') )
app.use( '/api/follow', require('./routes/follow.routes') )

//mean_user
//jUwZ6RDZYnJTpQ4m

app.listen( process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto' + port)
} );