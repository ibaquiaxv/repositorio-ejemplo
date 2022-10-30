const { app } = require('electron');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, admin } = require('../lib/auth');


router.get('/accidentes_form', isLoggedIn, async (req, res) =>{
    
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/accidentes',{unidad} );                                                
 });
 

 router.post('/accidentes_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoAccidente,Descripcion, detalle } = req.body;
 
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)
        let accidentes={
            TipoAccidente:TipoAccidente,
            FechaAccidente:Fecha.split("T").join('-').concat(":00"),
            LugarAccidente:Lugar,
            DescripcionAccidente:Descripcion,
            Id_UnidadAccidente:unidad[0].unidad
        }

     let consulta= await pool.query('insert into Accidentes set?',[accidentes])
    
                    for( i=0;i<detalle.length; i++){ 
                    let persona={
                        NombrePersona:detalle[i].Nombre,
                        EdadPersona:detalle[i].Edad,
                        sexo:detalle[i].Sexo,
                        EstadoPersona:detalle[i].VivoFallecido,
                        Armas:"N/A",
                        TipoPasajero:"N/A",
                        Id_Accidentes:consulta.insertId
                    }

                    await pool.query('insert into Persona set?',[persona])
                }

    
    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});




router.get('/accidentesTransito_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/accidentes_transito',{unidad} );                                                
 });


 router.post('/accidentesTransito_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoAccidente,Descripcion, detalle, detalle_vehiculos } = req.body;
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)

    let accidentes_transito={
        TipoAccidenteTransito:TipoAccidente,
        FechaAccidenteTransito:Fecha.split("T").join('-').concat(":00"),
        LugarAccidenteTransito:Lugar,
        DescripcionAT:Descripcion,
        Id_UnidadAT:unidad[0].unidad
    }

 let consulta= await pool.query('insert into AccidentesTransito set?',[accidentes_transito])
                    if(detalle_vehiculos.length>0){
                for( i=0;i<detalle_vehiculos.length; i++){ 
                let transporte={
                    TipoTransporte:detalle_vehiculos[i].TipoVehiculo,
                    MarcaTransporte:detalle_vehiculos[i].MarcaTransporte,
                    PlacaTransporte:detalle_vehiculos[i].PlacaTransporte,
                    Id_AccidentesTransito:consulta.insertId
                }

                await pool.query('insert into Transportes set?',[transporte])
            }
        }

            for( j=0;j<detalle.length; j++){ 
                if(detalle[j].Placa=="N/A"){
                   
                    let transporte2={
                        TipoTransporte:"Peatonal",
                        MarcaTransporte:"N/A",
                        PlacaTransporte:"N/A",
                        Id_AccidentesTransito:consulta.insertId
                    }
                  let peaton=  await pool.query('insert into Transportes set?',[transporte2])
                  console.log(peaton.insertId,"id_pe")
                
                
                let persona={
                    NombrePersona:detalle[j].Nombre,
                    EdadPersona:detalle[j].Edad,
                    sexo:detalle[j].Sexo,
                    EstadoPersona:detalle[j].VivoFallecido,
                    Armas:"N/A",
                    TipoPasajero:"Peatón",
                    Id_AccidentesTransito:consulta.insertId,
                    Id_Transportes:peaton.insertId
                }

                await pool.query('insert into Persona set?',[persona])
                }
                else{
                    let IdVehiculo= await pool.query('select t.IdTransportes as id, t.TipoTransporte from AccidentesTransito inner join Transportes as t on Id_AccidentesTransito=IdAccidentesTransito where t.PlacaTransporte=? and IdAccidentesTransito=?',[detalle[j].Placa,consulta.insertId])

                    let persona2={
                        NombrePersona:detalle[j].Nombre,
                        EdadPersona:detalle[j].Edad,
                        sexo:detalle[j].Sexo,
                        EstadoPersona:detalle[j].VivoFallecido,
                        Armas:"N/A",
                        TipoPasajero:detalle[j].TipoPasajero,
                        Id_AccidentesTransito:consulta.insertId,
                        Id_Transportes:IdVehiculo[0].id
                    }
    
                    await pool.query('insert into Persona set?',[persona2])
                }
            }
            


    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});
 



router.get('/ataques_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/ataques',{unidad} );                                                
 });

 router.post('/ataques_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoAtaque,Descripcion, detalle } = req.body;
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)
   

    let ataques={
        TipoAtaque:TipoAtaque,
        FechaAtaque:Fecha.split("T").join('-').concat(":00"),
        LugarAtaque:Lugar,
        DescripcionAtaque:Descripcion,
        Id_UnidadAtaque:unidad[0].unidad
    }

 let consulta= await pool.query('insert into Ataques set?',[ataques])

                for( i=0;i<detalle.length; i++){ 
                let persona={
                    NombrePersona:detalle[i].Nombre,
                    EdadPersona:detalle[i].Edad,
                    sexo:detalle[i].Sexo,
                    EstadoPersona:detalle[i].VivoFallecido,
                    Armas:detalle[i].TipoArma,
                    TipoPasajero:"N/A",
                    Id_Ataques:consulta.insertId
                }

                await pool.query('insert into Persona set?',[persona])
            }

    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});


router.get('/fugas_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/fugas',{unidad} );                                                
 });

 router.post('/fugas_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoFuga,Descripcion, Propietario, detalle } = req.body;
   
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)

    let fugas={
        TipoFuga:TipoFuga,
        FechaFuga:Fecha.split("T").join('-').concat(":00"),
        LugarFuga:Lugar,
        PropietarioFuga:Propietario,
        DescripcionFuga:Descripcion,
        Id_UnidadFuga:unidad[0].unidad
    }

 let consulta= await pool.query('insert into Fugas set?',[fugas])

                for( i=0;i<detalle.length; i++){ 
                let persona={
                    NombrePersona:detalle[i].Nombre,
                    EdadPersona:detalle[i].Edad,
                    sexo:detalle[i].Sexo,
                    EstadoPersona:detalle[i].VivoFallecido,
                    Armas:"N/A",
                    TipoPasajero:"N/A",
                    Id_Fugas:consulta.insertId
                }

                await pool.query('insert into Persona set?',[persona])
            }
    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});


router.get('/hospitalarios_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/hospitalarios',{unidad} );                                                
 });

 router.post('/hospitalarios_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoHospitalario,Descripcion, detalle } = req.body;
   
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)
    let hospitalarios={
        TipoHospitalario:TipoHospitalario,
        FechaHospitalario:Fecha.split("T").join('-').concat(":00"),
        LugarHospitalario:Lugar,
        DescripcionHospitalario:Descripcion,
        Id_UnidadHospitalario:unidad[0].unidad
    }

 let consulta= await pool.query('insert into Hospitalarios set?',[hospitalarios])

                for( i=0;i<detalle.length; i++){ 
                let persona={
                    NombrePersona:detalle[i].Nombre,
                    EdadPersona:detalle[i].Edad,
                    sexo:detalle[i].Sexo,
                    EstadoPersona:detalle[i].VivoFallecido,
                    Armas:"N/A",
                    TipoPasajero:"N/A",
                    Id_Hospitalarios:consulta.insertId
                }

                await pool.query('insert into Persona set?',[persona])
            }


    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});


router.get('/incendios_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/incendios',{unidad} );                                                
 });

 router.post('/incendios_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoIncendio,Descripcion,Propietario, detalle } = req.body;
    
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)
    let incendios={
        TipoIncendio:TipoIncendio,
        FechaIncendio:Fecha.split("T").join('-').concat(":00"),
        LugarIncendio:Lugar,
        PropietarioIncendio:Propietario,
        DescripcionIncendio:Descripcion,
        Id_UnidadIncendio:unidad[0].unidad
    }

 let consulta= await pool.query('insert into Incendios set?',[incendios])

                for( i=0;i<detalle.length; i++){ 
                let persona={
                    NombrePersona:detalle[i].Nombre,
                    EdadPersona:detalle[i].Edad,
                    sexo:detalle[i].Sexo,
                    EstadoPersona:detalle[i].VivoFallecido,
                    Armas:"N/A",
                    TipoPasajero:"N/A",
                    Id_Incendios:consulta.insertId
                }

                await pool.query('insert into Persona set?',[persona])
            }
    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});


router.get('/servicios_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/servicios',{unidad} );                                                
 });

 router.post('/servicios_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoServicio,Solicitante,Descripcion } = req.body;
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)

    let servicios={
        TipoServicio:TipoServicio,
        FechaServicio:Fecha.split("T").join('-').concat(":00"),
        LugarServicio:Lugar,
        Solicitante:Solicitante,
        DescripcionServicio:Descripcion,
        Id_UnidadServicio:unidad[0].unidad
    }

  await pool.query('insert into Servicios set?',[servicios])
    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});

router.get('/rastreosyrescates_form', isLoggedIn, async (req, res) =>{
 
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/rastreosyrescates',{unidad} );                                                
 });

 router.post('/rastreosyrescates_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoRR,Descripcion, detalle } = req.body;
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)
    let RR={
        TipoRR:TipoRR,
        FechaRR:Fecha.split("T").join('-').concat(":00"),
        LugarRR:Lugar,
        DescripcionRR:Descripcion,
        Id_UnidadRR:unidad[0].unidad
    }

 let consulta= await pool.query('insert into RastreosyRescates set?',[RR])

                for( i=0;i<detalle.length; i++){ 
                let persona={
                    NombrePersona:detalle[i].Nombre,
                    EdadPersona:detalle[i].Edad,
                    sexo:detalle[i].Sexo,
                    EstadoPersona:detalle[i].VivoFallecido,
                    Armas:"N/A",
                    TipoPasajero:"N/A",
                    Id_RR:consulta.insertId
                }

                await pool.query('insert into Persona set?',[persona])
            }
    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});

router.get('/viviendas_form', isLoggedIn, async (req, res) =>{
   
    const unidad= await pool.query('select distinct a.TipoAmbulancia, a.Placa from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia');
    
    res.render('formularios/viviendas',{unidad} );                                                
 });

 router.post('/viviendas_form', isLoggedIn, async (req, res) => {
    let { Id_Unidad, Lugar, Fecha,TipoVivienda,Descripcion, Propietario, detalle } = req.body;
    let unidad= await pool.query('select Max(IdUnidad) as unidad from Ambulancias as a inner join UnidadServicio as u on Id_Ambulancia= IdAmbulancia where a.Placa=?',Id_Unidad)

    let viviendas={
        TipoVivienda:TipoVivienda,
        FechaVivienda:Fecha.split("T").join('-').concat(":00"),
        LugarVivienda:Lugar,
        PropietarioVivienda:Propietario,
        DescripcionVivienda:Descripcion,
        Id_UnidadVivienda:unidad[0].unidad
    }

 let consulta= await pool.query('insert into Viviendas set?',[viviendas])

                for( i=0;i<detalle.length; i++){ 
                let persona={
                    NombrePersona:detalle[i].Nombre,
                    EdadPersona:detalle[i].Edad,
                    sexo:detalle[i].Sexo,
                    EstadoPersona:detalle[i].VivoFallecido,
                    Armas:"N/A",
                    TipoPasajero:"N/A",
                    Id_Viviendas:consulta.insertId
                }

                await pool.query('insert into Persona set?',[persona])
            }
    req.flash('success', 'Guardado correctamente');
     
    res.json('ok');
});

module.exports = router;