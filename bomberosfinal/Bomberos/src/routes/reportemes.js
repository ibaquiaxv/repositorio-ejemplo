const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn, admin } = require('../lib/auth');



router.get('/accidentes_mes', isLoggedIn, async (req, res) => {
    let mes = await AccidentesMes(null);
    console.log(mes.accidentes)
    res.render('reportesmes/accidentesmes', { 'accidentes': mes.accidentes,  'fecha': mes.date });
})

router.post('/accidentes_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await AccidentesMes(objeto);

    res.render('reportesmes/accidentesmes', { 'accidentes': mes.accidentes, 'fecha': mes.date })
})

let AccidentesMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const accidentes = await pool.query(`select a.IdAccidentes as id, a.FechaAccidente, a.LugarAccidente, a.TipoAccidente, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join accidentes as a on Id_Accidentes=IdAccidentes inner join UnidadServicio on Id_UnidadAccidente=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaAccidente)=${date.mes} and YEAR(FechaAccidente)=${date.anio} group by Id_Accidentes  order by FechaAccidente desc`);

    Mes = {
        accidentes,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}


router.get('/accidentestransito_mes', isLoggedIn, async (req, res) => {
    let mes = await AccidentestransitoMes(null);
    
    res.render('reportesmes/accidentestransitomes', { 'accidentestransito': mes.accidentestransito,  'fecha': mes.date });
})

router.post('/accidentestransito_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await AccidentestransitoMes(objeto);

    res.render('reportesmes/accidentestransitomes', { 'accidentestransito': mes.accidentestransito, 'fecha': mes.date })
})

let AccidentestransitoMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const accidentestransito = await pool.query(`select a.IdAccidentesTransito as id, a.FechaAccidenteTransito, a.LugarAccidenteTransito, a.TipoAccidenteTransito, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join accidentestransito as a on Id_AccidentesTransito=IdAccidentesTransito inner join UnidadServicio on Id_UnidadAT=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaAccidenteTransito)=${date.mes} and YEAR(FechaAccidenteTransito)=${date.anio} group by Id_AccidentesTransito  order by FechaAccidenteTransito desc`);

    Mes = {
        accidentestransito,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}


router.get('/ataques_mes', isLoggedIn, async (req, res) => {
    let mes = await AtaquesMes(null);
    
    res.render('reportesmes/ataquesmes', { 'ataques': mes.ataques,  'fecha': mes.date });
})

router.post('/ataques_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await AtaquesMes(objeto);

    res.render('reportesmes/ataquesmes', { 'ataques': mes.ataques, 'fecha': mes.date })
})

let AtaquesMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const ataques = await pool.query(`select a.IdAtaques as id, a.FechaAtaque, a.LugarAtaque, a.TipoAtaque, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join ataques as a on Id_Ataques=IdAtaques inner join UnidadServicio on Id_UnidadAtaque=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaAtaque)=${date.mes} and YEAR(FechaAtaque)=${date.anio} group by Id_Ataques  order by FechaAtaque desc`);

    Mes = {
        ataques,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

router.get('/fugas_mes', isLoggedIn, async (req, res) => {
    let mes = await FugasMes(null);
    
    res.render('reportesmes/fugasmes', { 'fugas': mes.fugas,  'fecha': mes.date });
})

router.post('/fugas_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await FugasMes(objeto);

    res.render('reportesmes/fugasmes', { 'fugas': mes.fugas, 'fecha': mes.date })
})

let FugasMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const fugas = await pool.query(`select a.IdFugas as id, a.FechaFuga, a.LugarFuga, a.TipoFuga, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join fugas as a on Id_Fugas=IdFugas inner join UnidadServicio on Id_UnidadFuga=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaFuga)=${date.mes} and YEAR(FechaFuga)=${date.anio} group by Id_Fugas  order by FechaFuga desc`);

    Mes = {
        fugas,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

router.get('/hospitalarios_mes', isLoggedIn, async (req, res) => {
    let mes = await HospitalariosMes(null);
    
    res.render('reportesmes/hospitalariosmes', { 'hospitalarios': mes.hospitalarios,  'fecha': mes.date });
})

router.post('/hospitalarios_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await HospitalariosMes(objeto);

    res.render('reportesmes/hospitalariosmes', { 'hospitalarios': mes.hospitalarios, 'fecha': mes.date })
})

let HospitalariosMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const hospitalarios = await pool.query(`select h.IdHospitalarios as id, h.FechaHospitalario, h.LugarHospitalario, h.TipoHospitalario, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join hospitalarios as h on Id_Hospitalarios=IdHospitalarios inner join UnidadServicio on Id_UnidadHospitalario=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaHospitalario)=${date.mes} and YEAR(FechaHospitalario)=${date.anio} group by Id_Hospitalarios  order by FechaHospitalario desc`);

    Mes = {
        hospitalarios,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

router.get('/incendios_mes', isLoggedIn, async (req, res) => {
    let mes = await IncendiosMes(null);
    
    res.render('reportesmes/incendiosmes', { 'incendios': mes.incendios,  'fecha': mes.date });
})

router.post('/incendios_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await IncendiosMes(objeto);

    res.render('reportesmes/incendiosmes', { 'incendios': mes.incendios, 'fecha': mes.date })
})

let IncendiosMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const incendios = await pool.query(`select i.IdIncendios as id, i.FechaIncendio, i.LugarIncendio, i.TipoIncendio, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join Incendios as i on Id_Incendios=IdIncendios inner join UnidadServicio on Id_UnidadIncendio=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaIncendio)=${date.mes} and YEAR(FechaIncendio)=${date.anio} group by Id_Incendios  order by FechaIncendio desc`);

    Mes = {
        incendios,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

router.get('/servicios_mes', isLoggedIn, async (req, res) => {
    let mes = await ServiciosMes(null);
    
    res.render('reportesmes/serviciosmes', { 'servicios': mes.servicios,  'fecha': mes.date });
})

router.post('/servicios_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await ServiciosMes(objeto);

    res.render('reportesmes/serviciosmes', { 'servicios': mes.servicios, 'fecha': mes.date })
})

let ServiciosMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const servicios = await pool.query(`select s.IdServicios as id, s.FechaServicio, s.LugarServicio, s.TipoServicio, am.TipoAmbulancia from  Servicios as s inner join UnidadServicio on Id_UnidadServicio=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaServicio)=${date.mes} and YEAR(FechaServicio)=${date.anio}  order by FechaServicio desc`);

    Mes = {
        servicios,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

router.get('/rastreosyrescates_mes', isLoggedIn, async (req, res) => {
    let mes = await RRMes(null);
    
    res.render('reportesmes/rastreosyrescatesmes', { 'RR': mes.RR,  'fecha': mes.date });
})

router.post('/rastreosyrescates_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await RRMes(objeto);

    res.render('reportesmes/rastreosyrescatesmes', { 'RR': mes.RR, 'fecha': mes.date })
})

let RRMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const RR = await pool.query(`select r.IdRR as id, r.FechaRR, r.LugarRR, r.TipoRR, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join rastreosyrescates as r on Id_RR=IdRR inner join UnidadServicio on Id_UnidadRR=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaRR)=${date.mes} and YEAR(FechaRR)=${date.anio} group by Id_RR  order by FechaRR desc`);

    Mes = {
        RR,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

router.get('/viviendas_mes', isLoggedIn, async (req, res) => {
    let mes = await ViviendasMes(null);
    
    res.render('reportesmes/viviendasmes', { 'viviendas': mes.viviendas,  'fecha': mes.date });
})

router.post('/viviendas_mes', isLoggedIn, async (req, res) => {
    let { date } = req.body;

    objeto = {
        mes: parseInt(date.slice(-2)),
        anio: parseInt(date.slice(0, 4))
    }
    let mes = await ViviendasMes(objeto);

    res.render('reportesmes/viviendasmes', { 'viviendas': mes.viviendas, 'fecha': mes.date })
})

let ViviendasMes = async (date = null) => {

    if (date === null) {
        var f = new Date();
        console.log(f)
        date = {
            mes: f.getMonth() + 1,
            anio: f.getFullYear()
        }
    }
    const viviendas = await pool.query(`select v.IdViviendas as id, v.FechaVivienda, v.LugarVivienda, v.TipoVivienda, am.TipoAmbulancia, count(p.IdPersona) as cantidad from persona as p inner join Viviendas as v on Id_Viviendas=IdViviendas inner join UnidadServicio on Id_UnidadVivienda=IdUnidad inner join Ambulancias as am on Id_Ambulancia=IdAmbulancia where MONTH(FechaVivienda)=${date.mes} and YEAR(FechaVivienda)=${date.anio} group by Id_Viviendas  order by FechaVivienda desc`);

    Mes = {
        viviendas,
        date: date.anio + '-' + ('0' + date.mes).slice(-2)
    }

    return Mes
}

module.exports = router;