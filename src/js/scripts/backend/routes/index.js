const express = require('express');
const router = express.Router();

const Estudiante = require('../models/estudiante.js');
const Docente = require('../models/docente.js'); 
const Users = require('../models/users.js'); 
router.get('/', (req,res) => {
    res.render('index')
});

router.get('/estudiantes', async (req,res) => {
    const estudiante = await Docente.find();
    console.log(estudiante);
    res.render('estudiantes')
});

router.get('/grupos', async (req,res) => {
    const estudiante = await Users.find();
    console.log(estudiante);
    res.render('grupos')
});
router.get('/docentes', (req,res) => {
    res.render('profesores')
});
router.get('/regEstudiante', (req,res) => {
    res.render('RegEstudiante')
});

router.get('/RegDocente', (req,res) => {
    res.render('RegDocente')
});

module.exports = router;
