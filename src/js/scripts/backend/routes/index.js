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
module.exports = router;
