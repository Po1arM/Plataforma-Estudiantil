const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const url = require('url')
const Estudiante = require('../models/estudiante.js')
const Docente = require('../models/docente.js')
const User = require('../models/users.js')
const Pensum = require('../models/pensum.js')
const Grupo = require('../models/grupo.js')
const Evento = require('../models/evento.js')
const Cont = require('../models/cont.js')
const Calificacion = require('../models/calificaciones.js')
const { redirect } = require('statuses')
const estudiante = require('../models/estudiante.js')

//Cargar pagina principal
router.get('/', (req,res) => {
    res.render('log')
});

router.get('/log', (req,res) => {
    res.render('log')
});



router.post('/', async (req,res) => {
    const user = await User.find({user: req.body.user,password: req.body.password})
    if(user.length == 0){
        res.render('LogIn')
    }else{
        if(user[0].tipo == 'admin'){
            res.redirect('/adminDashboard')
        } 
        if(user[0].tipo == 'estudiante'){
            const cod = user[0].cod
            res.render('vistaEstudiante',{cod})

        }if(user[0].tipo == 'docente'){
            const id = user[0].cod
            res.render('vistaDocente',{id})

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

router.get('/addEvent', (req,res) => {
    res.render('agregarEvento')
});

router.post('/addEvent', async (req,res) => {
    const evento = new Evento(req.body);
    await evento.save()
    res.redirect('/eventos')
});

router.get('/eliminarEvento/:id', async (req,res) => {
    const {id} = req.params
    await Evento.deleteOne({_id: id})
    res.redirect('/eventos')
});
router.get('/modEvento/:id', async (req,res) => {
    const {id} = req.params
    const evento = await Evento.findById(id)
    res.render('actualizarEvento',{evento})
});
router.post('/modEvento/:id', async (req,res) => {
    const {id} = req.params
    await Evento.update({_id : id }, req.body)
    res.redirect('/eventos')
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
    var cod = await User.find({cod: estudiante._id})
    cod = cod[0].user
    const edad = calcularEdad(estudiante.nacimiento)
    res.render('Perfil', {estudiante, edad, cod})
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
    const docentes = await Docente.find()
    res.render('modGrupo', {grupo,docentes})
})

router.post('/modificarGrupo/:id', async (req,res) => {
    const {id} = req.params
    const grupo = await Grupo.findById(id)
    const horario = req.body.dia + " " + req.body.hora
    await Grupo.update({_id: id}, {horario: horario, maestro: req.body.maestro})
    res.redirect('/grupos')
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


    const curso = req.body.curso
    const nivel = req.body.nivel
    const estudiantes = await Estudiante.find({curso:curso, nivel:nivel})

    var calificaciones= []

    for(var i = 0; i < estudiantes.length; i++){

        var objeto = { 
            "id"    : estudiantes[i]._id,
            "valor1" : 0,
            "valor2" : 0,
            "valor3" : 0,
            "valor4" : 0,
            "valor5" : 0,
            "valor6" : 0,
            "valor7" : 0,
            "cont" : 0

        };
        
        calificaciones.push(objeto)

    }
    console.log(calificaciones)
    const grupo = {
        codigo: cod.toUpperCase(),
        curso: req.body.curso ,
        nivel:  req.body.nivel,
        materia: req.body.asignatura,
        horario : horario,
        maestro : req.body.maestro,
        calificaciones: calificaciones
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
    materias = materias.slice(0,-3)
    console.log(materias)
    res.render('modPensum', {pensum, materias})
});

router.post('/modPensum/:id', async (req,res) =>{
    const {id} = req.params
    const materias = req.body.materias.replace(/ /g, "")
    await Pensum.update({_id:id}, {materia : materias.split('|')})
    res.redirect('/pensum')
})

//Cargar pagina regDocente
router.get('/RegDocente', (req,res) => {
    res.render('RegDocente')
});

router.get('/eventos',  async (req,res) => {
    const eventos = await Evento.find()
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
    const letra = await letraCurso(estudiante.nivel, estudiante.curso);  //aqui
    const cont = await Cont.find()
    console.log(cont)
    //Guarda el objeto en la base de datos
    await estudiante.save();
    const cod = zeroFill(cont[0].cont,4)
    cont[0].cont++
    await Cont.update({_id: cont[0].id},{cont:cont[0].cont })
    const user = {
        user: cod,
        cod: estudiante._id.toString(),
        password: estudiante.password,
        letra: estudiante.letra, //aqui
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
    res.redirect('/estudiantes');

});
function zeroFill( number, width )
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // siempre devuelve tipo cadena
}

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
    res.redirect('/docentes');

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
    const profesor = await Docente.findById(id);
    const grupos = await Grupo.find({maestro : profesor.nombre + " " + profesor.apellido});

    res.render('grupoActual',{
        id, grupos
    })

});


/*Edita esto*/
//Cargar ventana que muestra los estudiantes del grupo seleccionado por el Docente
router.get('/estudiantesDeGrupo/:id/:cod', async (req,res) => {
    
    const id = req.params.id
    const cod = req.params.cod
    const grupo = await Grupo.findById(id)
    const estudiantes = await Estudiante.find({curso : grupo.curso, nivel : grupo.nivel})
    console.log(grupo)

    res.render('estudiantesDeGrupo',{
        estudiantes,grupo,id,cod
    })


});

router.get('/generarPensum', async (req,res ) => {
    Grupo.db.dropCollection('grupos', function(err,result){
        if(err){ 
            console.log(err)
        }else{
        console.log('Grupos eliminados')
    }})
    await generarGrupos()
    res.redirect('/grupos')
})

//Calcular la letra del curso
async function letraCurso(nivelActual, cursoActual){
    const cantEstudiantes = await Estudiante.find({curso: cursoActual, nivel: nivelActual}).count();
    var letra = String.fromCharCode(65+ (cantEstudiantes/5));

    return letra;
}

async function generarGrupos(){
    const pensums = await Pensum.find()
    for(var i = 0; i < pensums.length; i++){
        console.log(pensums.length)
        var cantEstudiantes = await cantGrupos(pensums[i])
        console.log(cantEstudiantes)

        for(var j = 0; j < cantEstudiantes; j++){
            for(var k = 0; k < pensums[i].materia.length; k++) {

                var letraGrupo = String.fromCharCode(64+cantEstudiantes);
                var cod = pensums[i].materia[k].slice(0,3) + "-" + pensums[i].curso[0] + letraGrupo + "-" + pensums[i].nivel.slice(0,3) 
                var calificaciones = await calificacione(pensums[i].curso, pensums[i].nivel)
                var grupo = {
                    codigo: cod.toUpperCase(),
                    curso: pensums[i].curso ,
                    nivel:  pensums[i].nivel,
                    materia: pensums[i].materia[k],
                    calificaciones: calificaciones
                }
                Grupo.collection.insertOne(grupo, function(err,docs) {
                    if(err){ 
                        console.log(err)
                    } else {
                        console.log('Grupo insertado')
                    }
                })
            }
        }
    
    }
}
//Cargar pagina para calificar 
router.get('/calificar/:id/:cod', async (req,res) => {
    const id = req.params.id
    const cod = req.params.cod
    const grupo =  await Grupo.findOne({_id: id});
    const estudiante = await Estudiante.findOne({_id: cod})
    var nota
    var cod1
    var calificaciones = await Calificacion.findOne({ estudiante : estudiante._id, grupo : grupo._id})
    console.log(calificaciones)
    if(calificaciones){
        nota = calificaciones.nota
        cod1 = calificaciones._id.toString()
        console.log(grupo, estudiante,calificaciones)
        
        res.render('calificar', {grupo, estudiante, nota,id,cod })
    } else{
        nota = []
        for(var i = 0; i < 7; i++){
            nota.push(0);
        }
        calificaciones = {
            estudiante : estudiante._id.toString(),
            grupo : grupo._id.toString(),
            nota : nota
            
        }

        Calificacion.collection.insertOne(calificaciones, function(err,docs) {
            if(err){ 
                console.log(err)
            } else {
                console.log('calificaciones insertado')
            }
        })
        calificaciones = await Calificacion.findOne({ estudiante : estudiante._id, grupo : grupo._id})
        console.log(grupo, estudiante._id, calificaciones)
        nota = calificaciones.nota
        console.log(nota)
        cod1 = calificaciones._id.toString()
        res.render('calificar', 
        {nota, grupo, estudiante})

    }

});

//Enviar calificacion
router.get('/gruposEstudiante/:id', async (req,res) => {
    const id = mongoose.Types.ObjectId(req.params.id)
    console.log(id)
    const estudiante = await Estudiante.findById(id)
    console.log(estudiante)
    const grupos = await Grupo.find({nivel: estudiante.nivel, curso : estudiante.curso})
    console.log(grupos)
    const cod = id
    res.render('gruposEstudiante',{
        grupos,id,cod
    })});





router.post('/calificar/:id/:cod', async (req,res) =>{

    var id = req.params.id
    const cod = req.params.cod
    const grupo =  await Grupo.findOne({_id: id});
    const estudiantes = await Estudiante.findOne({_id: cod})
    var calificaciones = await Calificacion.findOne({ estudiante : estudiantes._id, grupo : grupo._id})
    nota = crearNota(req.body)
    await Calificacion.update({_id: calificaciones._id},{nota: nota})
    console.log(calificaciones)
    nombre = grupo.maestro.split(" ")
    const profesor = await Docente.findOne({nombre: nombre[0], apellido: nombre[1]})
    const grupos = await Grupo.find({maestro : profesor.nombre + " " + profesor.apellido});

    id = profesor._id
    res.render('grupoActual',{id,grupos})

});
function crearNota(nota){
    notas = []
    notas.push(nota.nota1)
    notas.push(nota.nota2)
    notas.push(nota.nota3)
    notas.push(nota.nota4)
    notas.push(nota.nota5)
    notas.push(nota.nota6)
    notas.push(nota.nota7)
    return notas
}
//Cargar pagina de ver eventos en Docente y Estudiante

router.get('/verEventos/:id',  async (req,res) => {
    const {id} = req.params
    const eventos = await Evento.find()
    res.render('verEventos', {eventos, id})
});

router.get('/eventosEstudiantes/:cod', async (req,res) => {
    const eventos = await Evento.find()
    const cod = req.params.cod
    res.render('verEventosEstud',{eventos,cod})
})

router.get('/calificaciones/:cod', async (req,res) => {
    const {cod} = req.params
    var calificaciones = await Calificacion.find({estudiante: cod})
    var mat = []
    var cali = []
    if(calificaciones.length != 0){
        for(var i = 0; i < calificaciones.length; i++){
            var materia = await Grupo.findOne({_id: calificaciones[i].grupo})
            if(meteria != null){
                mat.push(materia.materia)
                cali[i] = calificaciones[i].nota
            }
        };
        console.log(cali)
    res.render('calificaciones',{cod,mat, cali})
    }
    
})
async function calificacione(curso, nivel){
    const estudiantes = await Estudiante.find({curso: curso, nivel: nivel})
    var calificaciones = []

    for(var i = 0 ; i < estudiantes.length; i++){
        var objeto = {
            "id"    : estudiantes[i]._id,
            "valor1" : 0,
            "valor2" : 0,
            "valor3" : 0,
            "valor4" : 0,
            "valor5" : 0,
            "valor6" : 0,
            "valor7" : 0,
            "cont" : 0

        }
        calificaciones.push(objeto)
    }
    return calificaciones
} 

async function cantGrupos(pensum){
    var cantEstudiantes = await Estudiante.find({curso:pensum.cuso, nivel: pensum.nivel}).count()
    cantEstudiantes = Math.floor(cantEstudiantes/5)

    return cantEstudiantes + 1
}
module.exports = router;
