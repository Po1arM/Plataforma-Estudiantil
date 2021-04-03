const express = require('express');
const router = express.Router();

const Estudiante = require('../models/estudiante.js');
const Docente = require('../models/docente.js'); 

router.get('/', (req,res) => {
    res.render('index')
});

router.get('/estudiantes', async (req,res) => {
    const estudiante = await Estudiante.find();
    console.log(estudiante);
    res.render('estudiantes')
});

router.get('/grupos', (req,res) => {
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
