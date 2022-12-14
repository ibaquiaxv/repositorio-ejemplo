const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
// const hbs = require('hbs');
// hbs.registerHelper("equal", require("handlebars-helper-equal"));



const {database} = require('./keys');
const { initialize } = require('passport');
const { Readable } = require('stream');

// initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 7000);

app.set('views', path.join(__dirname, 'views'));



app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'), 
    extname:'.hbs',
    helpers: require('./lib/handlebars')
   
    
}));


app.set('view engine','.hbs');


//middlewares
app.use(session({
    secret: 'Marcosmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)

}))
app.use (flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//global variables
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    app.locals.user2 = req.user2;
    next();
});
//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/registros',require('./routes/registros'));
app.use('/formularios',require('./routes/formularios'));
app.use('/reportemes',require('./routes/reportemes'));
app.use('/reportefinal',require('./routes/reportefinal'));


//public
app.use(express.static(path.join(__dirname, 'public')));
//starting the server
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});