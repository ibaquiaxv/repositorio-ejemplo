const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, admin } = require('../lib/auth');

router.get('/accidentesfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarAccidente as lugar, a.DescripcionAccidente as descripcion, date_format(FechaAccidente, "%d/%m/%Y-%h:%i %p") as fecha from accidentes as a inner join unidadservicio on Id_UnidadAccidente=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdAccidentes=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoAccidente, a.FechaAccidente, date_format(FechaAccidente, "%Y-%m") as fecha_formateada from persona as p inner join accidentes as a on Id_Accidentes=IdAccidentes where IdAccidentes=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaAccidente.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/accidentesfinal', {Tipo:detalle[0].TipoAccidente,date, detalle, encabezado, regresar});
})


router.get('/accidentestransitofinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let vehiculo = await pool.query('select TipoTransporte as vehiculo, MarcaTransporte as marca, PlacaTransporte as placa from transportes inner join accidentestransito on Id_AccidentesTransito=IdAccidentesTransito where TipoTransporte!="Peatonal" and IdAccidentesTransito=?',[id])
     let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarAccidenteTransito as lugar, a.DescripcionAT as descripcion, date_format(FechaAccidenteTransito, "%d/%m/%Y-%h:%i %p") as fecha from accidentesTransito as a inner join unidadservicio on Id_UnidadAT=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdAccidentesTransito=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, p.TipoPasajero, act.TipoAccidenteTransito, act.FechaAccidenteTransito, date_format(FechaAccidenteTransito, "%Y-%m") as fecha_formateada, v.PlacaTransporte as placa from AccidentesTransito as act inner join Transportes as v on Id_AccidentesTransito=IdAccidentesTransito inner join Persona as p on Id_Transportes =IdTransportes where IdAccidentesTransito=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaAccidenteTransito.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/accidentestransitofinal', {Tipo:detalle[0].TipoAccidenteTransito, detalle, date, encabezado, regresar, vehiculo});
})

router.get('/ataquesfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarAtaque as lugar, a.DescripcionAtaque as descripcion, date_format(FechaAtaque, "%d/%m/%Y-%h:%i %p") as fecha from ataques as a inner join unidadservicio on Id_UnidadAtaque=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdAtaques=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoAtaque, p.Armas, a.FechaAtaque, date_format(FechaAtaque, "%Y-%m") as fecha_formateada from persona as p inner join ataques as a on Id_Ataques=IdAtaques where IdAtaques=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaAtaque.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/ataquesfinal', {Tipo:detalle[0].TipoAtaque,date, detalle, encabezado, regresar});
})

router.get('/fugasfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarFuga as lugar, a.PropietarioFuga as propietario, a.DescripcionFuga as descripcion,  date_format(FechaFuga, "%d/%m/%Y-%h:%i %p") as fecha from fugas as a inner join unidadservicio on Id_UnidadFuga=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdFugas=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoFuga, a.FechaFuga, date_format(FechaFuga, "%Y-%m") as fecha_formateada from persona as p inner join fugas as a on Id_Fugas=IdFugas where IdFugas=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaFuga.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/fugasfinal', {Tipo:detalle[0].TipoFuga,date, detalle, encabezado, regresar});
})


router.get('/hospitalariosfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarHospitalario as lugar, a.DescripcionHospitalario as descripcion, date_format(FechaHospitalario, "%d/%m/%Y-%h:%i %p") as fecha from hospitalarios as a inner join unidadservicio on Id_UnidadHospitalario=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdHospitalarios=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoHospitalario, a.FechaHospitalario, date_format(FechaHospitalario, "%Y-%m") as fecha_formateada from persona as p inner join hospitalarios as a on Id_Hospitalarios=IdHospitalarios where IdHospitalarios=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaHospitalario.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/hospitalariosfinal', {Tipo:detalle[0].TipoHospitalario,date, detalle, encabezado, regresar});
})


router.get('/incendiosfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarIncendio as lugar,a.PropietarioIncendio as propietario, a.DescripcionIncendio as descripcion, date_format(FechaIncendio, "%d/%m/%Y-%h:%i %p") as fecha from incendios as a inner join unidadservicio on Id_UnidadIncendio=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdIncendios=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoIncendio, a.FechaIncendio, date_format(FechaIncendio, "%Y-%m") as fecha_formateada from persona as p inner join incendios as a on Id_Incendios=IdIncendios where IdIncendios=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaIncendio.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/incendiosfinal', {Tipo:detalle[0].TipoIncendio,date, detalle, encabezado, regresar});
})

router.get('/serviciosfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarServicio as lugar, a.DescripcionServicio as descripcion, date_format(FechaServicio, "%d/%m/%Y-%h:%i %p") as fecha from servicios as a inner join unidadservicio on Id_UnidadServicio=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdServicios=?',[id])
    const detalle = await pool.query('select TipoServicio, FechaServicio, date_format(FechaServicio, "%Y-%m") as fecha_formateada,  LugarServicio as lugar, DescripcionServicio as descripcion, Solicitante from servicios where IdServicios=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaServicio.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/serviciosfinal', {Tipo:detalle[0].TipoServicio,date, detalle, encabezado, regresar});
})


router.get('/RRfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarRR as lugar, a.DescripcionRR as descripcion, date_format(FechaRR, "%d/%m/%Y-%h:%i %p") as fecha from rastreosyrescates as a inner join unidadservicio on Id_UnidadRR=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdRR=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoRR, a.FechaRR, date_format(FechaRR, "%Y-%m") as fecha_formateada from persona as p inner join rastreosyrescates as a on Id_RR=IdRR where IdRR=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaRR.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/RRfinal', {Tipo:detalle[0].TipoRR,date, detalle, encabezado, regresar});
})

router.get('/viviendasfinal/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params; 
    let encabezado = await pool.query('select b.Nombres, b.Apellidos, am.TipoAmbulancia, a.LugarVivienda as lugar,a.PropietarioVivienda as propietario, a.DescripcionVivienda as descripcion, date_format(FechaVivienda, "%d/%m/%Y-%h:%i %p") as fecha from viviendas as a inner join unidadservicio on Id_UnidadVivienda=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia inner join bombero as b on Id_bombero=IdBombero where IdViviendas=?',[id])
    const detalle = await pool.query('select p.NombrePersona, p.EdadPersona, p.sexo, p.EstadoPersona, a.TipoVivienda, a.FechaVivienda, date_format(FechaVivienda, "%Y-%m") as fecha_formateada from persona as p inner join viviendas as a on Id_Viviendas=IdViviendas where IdViviendas=?',[id]);
    var letras = { year: 'numeric', month: 'long', day: 'numeric'};
 let regresar=detalle[0].fecha_formateada;
 console.log(regresar)
let date= detalle[0].FechaVivienda.toLocaleDateString("es-ES", letras).toUpperCase()
    res.render('reportesfinal/viviendasfinal', {Tipo:detalle[0].TipoVivienda,date, detalle, encabezado, regresar});
})

module.exports = router