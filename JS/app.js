const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const uri = 'mongodb+srv://admin:Fj028929@plataformaestudiantil.uzjq1.mongodb.net/plataforma?retryWrites=true&w=majority'
// Conectar a la Base de datos
mongoose.connect(uri)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err))

// Importar rutas
const indexRoutes = require('./routes/index');

// Configuracion 
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname + '/views'));
app.set('Styles',path.join(__dirname + '/Styles'));
app.set('view engine','ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Rutas
app.use('/', indexRoutes);

// Inicializar Server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
})
