const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, admin } = require('../lib/auth');

router.get('/bomberos_reg1', isLoggedIn, async (req, res) =>{
   const roles= await pool.query('select * from rol');
   res.render('bomberos/registrarbm',{roles} );                                                
});

router.post('/bomberos_reg', isLoggedIn, async (req, res) =>{
    var {Nombres,Apellidos,Telefono,direccion,sexo,FechaNacimiento,DPI} = req.body;

    var bombero={
        Nombres:Nombres,
        Apellidos:Apellidos,
        Telefono: Telefono, 
        direccion: direccion,
        sexo:sexo ,
        FechaNacimiento:FechaNacimiento,
        DPI:DPI
    }
        console.log(bombero)
    await pool.query('insert into Bombero set?', [bombero]);
    req.flash('success', 'Guardado correctamente');
    res.redirect('/registros/bomberos_reg1')
 });


 router.get('/ambulancias_reg1', isLoggedIn, async (req, res) =>{
    
    res.render('ambulancias/registraram' );                                                
 });
 
 router.post('/ambulancias_reg', isLoggedIn, async (req, res) =>{
     var {Marca,Modelo,Placa,TipoAmbulancia} = req.body;
 
     var ambulancia={
         Marca:Marca,
         Modelo:Modelo,
         Placa:Placa,
         TipoAmbulancia:TipoAmbulancia
     }
        
      await pool.query('insert into ambulancias set?', [ambulancia]);
     req.flash('success', 'Guardado correctamente');
     res.redirect('/registros/ambulancias_reg1')
    
  });

  router.get('/unidades_reg1', isLoggedIn, async (req, res) =>{
    const ambulancias= await pool.query('select * from ambulancias');
    const bomberos= await pool.query('select * from bombero where Nombres!="bomberoprueba"');
    // console.log(ambulancias)
    res.render('unidades/unidades' ,{ambulancias,bomberos});                                                
 });
 
 router.post('/unidades_reg', isLoggedIn, async (req, res) =>{
     var {Id_Bombero,Id_Ambulancia} = req.body;
 
     var unidad={
         Id_Bombero:Id_Bombero,
         Id_Ambulancia: Id_Ambulancia
     }
        console.log(unidad)
      await pool.query('insert into UnidadServicio set?', [unidad]);
     req.flash('success', 'Guardado correctamente');
     res.redirect('/registros/unidades_reg1')
    
  });




module.exports = router;