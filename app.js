const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const uri = 'mongodb+srv://admin:Fj028929@plataformaestudiantil.uzjq1.mongodb.net/plataforma?retryWrites=true&w=majority'
const consolidate = require('consolidate');

// Conectando a Mongo
mongoose.connect(uri)
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));


// Importando Rutas
const indexRoutes = require('./src/js/scripts/backend/routes/index')

// Config
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/theme-assets'));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Rutas
app.use('/',indexRoutes);

// Iniciando server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`);
})