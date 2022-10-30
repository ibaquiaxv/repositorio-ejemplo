const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn, admin} = require('../lib/auth');

router.get('/',isNotLoggedIn,(req,res)=>{
    res.render('index');
});



module.exports = router;