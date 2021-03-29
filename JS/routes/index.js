const express = require('express');
const router = express.Router();
const Estu = require('../models/estudiante');
const Prof = require('../models/profesor');

//Ruta del login
router.get('/', async (req, res) => {
    res.render('Login');
});

//Buscar a los profesores en BD y renderizar ventana
router.get('/profesor', async (req, res) => {
    const prof = await Prof.find();
    console.log(prof);
    res.render('profesor', {
        profesor: prof
    });
});

//Renderizar perfil de usuario
router.get('/perfil/:id', async (req, res) => {
    const {id} = req.params;
    const est = await Estu.findById(id);
    res.render('perfil', {
        est
    })

});

//Buscar a los estudiantes en BD y renderizar ventana
router.get('/start', async (req, res) => {
    const estud = await Estu.find({tipo:'estudiante'});
    res.render('indexAdmin',{
        estudiante: estud
    });
});


module.exports = router;