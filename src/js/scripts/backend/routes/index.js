const express = require('express')
const router = express.Router()

const Estudiante = require('../models/estudiante.js')
const Docente = require('../models/docente.js')
const User = require('../models/users.js')
const Pensum = require('../models/pensum.js')
const Grupo = require('../models/grupo.js')
const Evento = require('../models/evento.js')

const { redirect } = require('statuses')

//Cargar pagina principal
router.get('/', (req,res) => {
    res.render('LogIn')
});

router.post('/', async (req,res) => {
    const user = await User.find({user: req.body.user,password: req.body.password})
    if(user.length == 0){
        res.redirect('/')
    }else{
        if(user[0].tipo == 'admin'){
            res.redirect('/adminDashboard')
        } 
        if(user[0].tipo == 'estudiante'){
            const cod = user[0].cod
            res.render('vistaEstudiante')

        }if(user[0].tipo == 'docente'){
            const cod = user[0].cod
            res.render('vistaDocente',{cod})

        }
    }
});


router.get('/adminDashboard', async (req,res) => {
    const estudiantes = await Estudiante.count();
    const docentes = await Docente.count();
    const grupos = await Grupo.count();

    res.render('index', {
        estudiantes,
        docentes,
        grupos
    });
});


router.get('/vistaDocente', async (req,res) => {
    const estudiantes = await Estudiante.count();
    const docentes = await Docente.count();
    const grupos = await Grupo.count();

    res.render('vistaDocente', {
        estudiantes,
        docentes,
        grupos
    });
});
router.get('/perfil/:id', async (req,res) => {
    const {id} = req.params
    const estudiante = await Estudiante.findById(id)
    const edad = calcularEdad(estudiante.nacimiento)
    res.render('Perfil', {estudiante, edad})
})

//Cargar pagina estudiantes
router.get('/estudiantes', async (req,res) => {
    const estudiantes = await Estudiante.find();
    res.render('estudiantes',{
        estudiantes
    })
})

//Cargar pagina grupos
router.get('/grupos',  async (req,res) => {
    const grupos = await Grupo.find()
    console.log(grupos)

    res.render('grupos',{
        grupos
    })
});

router.get('/eliminarGrupo/:id', async (req,res) => {
    const {id} = req.params
    await Grupo.deleteOne({_id: id})
    res.redirect('/grupos')
})

router.get('/modificarGrupo/:id', async (req,res) => {
    const {id} = req.params
    const grupo = await Grupo.findById(id)
    res.render('modGrupo', {grupo})
})

router.get('/crearGrupo', async (req,res) => {
    const docentes = await Docente.find()
    res.render('crearGrupo', {docentes})
});

router.post('/crearGrupo', async (req,res) => {
    var cantGrupos = await Grupo.find({curso : req.body.curso, 
                                        nivel : req.body.nivel,
                                        materia : req.body.asignatura}).count()
    cantGrupos = String.fromCharCode(65+cantGrupos);
    const horario = req.body.dia + " " + req.body.hora

    const cod = req.body.asignatura.slice(0,3) + "-" + req.body.curso[0] + cantGrupos + "-" + req.body.nivel.slice(0,3) 
    const grupo = {
        codigo: cod.toUpperCase(),
        curso: req.body.curso ,
        nivel:  req.body.nivel,
        materia: req.body.asignatura,
        horario : horario,
        maestro : req.body.maestro
    }
    console.log( grupo  )
    
    Grupo.collection.insertOne(grupo, function(err,docs) {
        if(err){ 
            console.log(err)
        } else {
            console.log('Grupo insertado')
        }
    }) 
    res.redirect('grupos')
    
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

router.get('/perfilDocente/:id', async (req,res) => {
    const {id} = req.params
    const docente = await Docente.findById(id)
    const grupos = await Grupo.find({maestro: docente.nombre + " " + docente.apellido})
    console.log(docente)
    const edad = calcularEdad(docente.nacimiento)
    res.render('perfilDocente', {docente, edad, grupos})
})

router.get('/modPensum/:id', async (req,res) => {
    const {id} = req.params
    const pensum = await Pensum.findById(id)
    var materias = "";
    pensum.materia.forEach(element => {
        console.log(element)
        materias = materias.concat(element, " | ")
    });
    console.log(materias)
    res.render('modPensum', {pensum, materias})
});

router.post('/modPensum/:id', async (req,res) =>{
    const {id} = req.params
    await Pensum.update({_id:id}, {materia : req.body.materias.split("|")})
    res.redirect('/pensum')
})

//Cargar pagina regDocente
router.get('/RegDocente', (req,res) => {
    res.render('RegDocente')
});

router.get('/eventos',  async (req,res) => {
    const eventos = Evento.find()
    res.render('eventos', {eventos})
});

router.get('/pensum', async (req,res) => {
    const pensums = await Pensum.find();

    res.render('pensum' ,{
        pensums
    })
});

//Registrar estudiante
router.post('/regEstud', async (req,res) => {
    //Crea un nuevo objeto con los datos del formulario
    const estudiante = new Estudiante(req.body);
    //Guarda el objeto en la base de datos
    await estudiante.save();
    const user = {
        cod: estudiante._id.toString(),
        user: estudiante.nombre + estudiante.apellido  ,
        password: estudiante.password,
        tipo: "estudiante"
    }
    User.collection.insertOne(user, function(err,docs) {
        if(err){ 
            console.log(err)
        } else {
            console.log('Usuario insertado')
        }
    })  
    //Vuelve a cargar la pestaña de registro
    res.render('RegEstudiante');

});

//Registrar Docente
router.post('/regDoc', async (req,res) =>{

    const docente = new Docente(req.body);
    await docente.save();
    const user = {
        cod: docente._id.toString(),
        user: docente.nombre + docente.apellido  ,
        password: docente.password,
        tipo: "docente"
    }
    User.collection.insertOne(user, function(err,docs) {
        if(err){ 
            console.log(err)
        } else {
            console.log('Usuario insertado')
        }
    })  
    res.render('RegDocente');

});

function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = fecha;
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad
}


//Cargar Vista del Docente
router.get('/vistaDocente', (req,res) => {
    res.render('vistaDocente')
});

//Cargar vista del estudiante
router.get('/vistaEstudiante', (req,res) => {
    res.render('vistaEstudiante')
});


//Cargar ventana del grupo del que se encarga el docente
router.get('/grupoActual/:id', async (req,res) => {
    
    const {id} = req.params
    console.log(id)
    const profesor = await Docente.findById(id);
    const grupos = await Grupo.find({maestro : profesor.nombre + " " + profesor.apellido});

    res.render('grupoActual',{
        grupos,id
    })

});


/*Edita esto*/
//Cargar ventana que muestra los estudiantes del grupo seleccionado por el Docente
router.get('/estudiantesDeGrupo', (req,res) => {
    /*
    const {id} =  req.params
    const profesor = await Docente.findById(cod)
    const grupos = await Grupo.find({maestro : profesor.nombre + " " + profesor.apellido})
    console.log(grupos)*/

    res.render('estudiantesDeGrupo')


});


/*
router.get('/perfilDocente/:id', async (req,res) => {
    const {id} = req.params
    const docente = await Docente.findById(id)
    const grupos = await Grupo.find({maestro: docente.nombre + " " + docente.apellido})
    console.log(docente)
    const edad = calcularEdad(docente.nacimiento)
    res.render('perfilDocente', {docente, edad, grupos})
})*/

module.exports = router;
