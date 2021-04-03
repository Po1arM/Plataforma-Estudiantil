const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('index')
});


router.get('/estudiantes', (req,res) => {
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
