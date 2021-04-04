const express = require('express');
const router = express.Router();

const Estudiante = require('../models/estudiante.js');
const Docente = require('../models/docente.js'); 
const Users = require('../models/users.js'); 

//Cargar pagina principal
router.get('/', async (req,res) => {
    const estudiantes = await Estudiante.count();
    const docentes = await Docente.count();

    res.render('index', {
        estudiantes,
        docentes
    });
});

//Cargar pagina estudiantes
router.get('/estudiantes', async (req,res) => {
    const estudiantes = await Estudiante.find();
    res.render('estudiantes',{
        estudiantes
    });
});

//Cargar pagina grupos
router.get('/grupos', async (req,res) => {
    const estudiante = await Users.find();
    console.log(estudiante);
    res.render('grupos')
});

//Cargar pagina docentes
router.get('/docentes', (req,res) => {
    res.render('profesores')
});

//Cargar pagina regEstudiante
router.get('/regEstudiante', (req,res) => {
    res.render('RegEstudiante')
});

//Cargar pagina regDocente
router.get('/RegDocente', (req,res) => {
    res.render('RegDocente')
});

//Registrar estudiante
router.post('/regEstud', async (req,res) => {
    //Crea un nuevo objeto con los datos del formulario
    const estudiante = new Estudiante(req.body);
    //Guarda el objeto en la base de datos
    await estudiante.save();
    //Vuelve a cargar la pestaña de registro
    res.render('RegEstudiante');

});

//Registrar Docente
router.post('/regDoc', async (req,res) =>{

    const docente = new Docente(req.body);
    await docente.save();
    res.render('RegEstudiante');
    console.log(new Docente(req.body));

});


module.exports = router;
