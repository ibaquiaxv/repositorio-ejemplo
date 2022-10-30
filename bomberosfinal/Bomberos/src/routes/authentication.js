const express = require('express');
// const { route } = require('./links');
const pool = require('../database');
const router = express.Router();

const passport = require('passport');
const {isLoggedIn, isNotLoggedIn, admin} = require('../lib/auth');

router.get('/signup',  async (req, res) =>{

   const bomberos= await pool.query('select * from Bombero');
   const roles= await pool.query('select * from rol');
   console.log(bomberos)
res.render('auth/signup', {bomberos,roles});
});


// router.post('/signup', isLoggedIn,  passport.authenticate('local.signup', {
//     // successRedirect: '/profile',
    
//     failureRedirect: '/signup',
//     failureFlash: true

// }));
router.post('/signup',  async (req, res) =>{
    const {username, password,Id_Bombero,Id_Rol} = req.body;
    // const{lineas}= req.body;
         
    const newUser = {
        username,
        password,
        Id_Bombero,
        Id_Rol
     };
     
    let rows = await pool.query('SELECT * FROM users');
   console.log("Rows users table: ",rows.length);
   var a = 0;

   if (rows.length > 0) {   
      for (i = 0; i < rows.length; i++) {
         var x = [rows[i].username].toString().toLowerCase();
         var y = newUser.username.toString().toLowerCase();
         
         if (x === y) {
            a++;
         }
      }
   }

   if (a === 0) {
     await pool.query('INSERT INTO users SET ?', [newUser]);
     req.flash('success', 'Usuario registrado exitosamente');
    //   return done(null, newUser);
    res.redirect('/signup');
   }
   else {
      req.flash('message', 'ingrese otro usuario, este ya esta en uso');
      res.redirect('/signup');
   }
    // res.render('/profile');
   
    });
    


router.get('/signin', isNotLoggedIn, (req, res)=>{
    console.log("sdf")
    res.render('auth/signin');
});

router.post('/signin', isNotLoggedIn, (req, res, next)=>{
    console.log("pos");
    passport.authenticate('local.signin',{
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    }) (req, res, next); 
   
});

router.get('/profile', isLoggedIn, (req, res)=>{
    res.render('profile');
});


router.get('/usuarios', isLoggedIn, admin, async(req, res)=>{
    const users = await pool.query('SELECT * FROM users');
    res.render('auth/usuarios', {users});
});

router.get('/edit_user/:id', isLoggedIn, admin, async (req, res) =>{
    const {id} = req.params;  
    const users = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
   res.render('auth/edit_user', {edit: users[0]});                                                
});

router.post('/edit_user/:id', isLoggedIn, admin, async (req, res) =>{
    const {id} = req.params;
    // console.log(title.req.params);
    let { password} = req.body;

    const newUser = {
        password,
        
     };
      console.log(newUser);
      console.log(id);
   await pool.query('UPDATE users set ? WHERE id = ?', [newUser, id]);  
   req.flash('success', 'se ha actualizado correctamente');
   res.redirect('/usuarios');
});

router.get('/delete_user/:id',isLoggedIn, async(req,res)=>{
    await pool.query('Delete from users where id=?',req.params.id);
    res.json('Eliminado con exito');
})

router.get('/logout', isLoggedIn, (req, res)=>{
    req.logOut(); 
    res.redirect('/');
})



module.exports = router;