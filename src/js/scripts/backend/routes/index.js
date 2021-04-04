const express = require('express')
const router = express.Router()

const Estudiante = require('../models/estudiante.js')
const Docente = require('../models/docente.js')
const Users = require('../models/users.js')
const Pensum = require('../models/pensum.js')
const Grupo = require('../models/grupo.js')
const { render } = require('ejs')
const { any } = require('bluebird')
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
    })
})

//Cargar pagina grupos
router.get('/grupos',  async (req,res) => {
    const grupos = Grupo.find()
    console.log(grupos)

    res.render('grupos',{
        grupos
    })
});

//Cargar pagina docentes
router.get('/docentes', async (req,res) => {
    const docentes = await Docente.find();
    console.log(docentes)
    res.render('profesores', {
        docentes
    })
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

router.get('/genGrupos', async (req,res) => {
    const pensum = await Pensum.find();
    for(var i = 0 ; i  < pensum.length;i++ ){
        console.log(pensum[i].materia)
        generar(pensum[i], pensum[i].materias);
        
    }
    
})

async function generar(pensum,arr) {
    const nivel = pensum.nivel;
    const curso = pensum.curso;
    
    
    pensum.materia.forEach(element => {
        const mat = element
        const cod = mat.slice(0,4).toUpperCase() + curso.slice(0,2) +  nivel.slice(0,4).toUpperCase()
        
        const newGroup = {codigo: cod,
            curso: curso,
            nivel: nivel,
            materia: mat}

           Grupo.collection.insertOne(newGroup, function(err,docs) {
               if(err){ 
                   console.log(err)
               } else {
                   console.log('Grupo insertado')
               }
           })  
    });

    const grupos = Grupo.find()
    res.render('grupos',{
        grupos
    })        
}
    


module.exports = router;
