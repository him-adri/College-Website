const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
var cons = require('consolidate');
const session = require('express-session');
const pageRouter = require('./routes/pages');
const app = express();

// for body parser
app.use(express.urlencoded({extended: false}));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// file upload
app.use(fileUpload());


// app.engine('html', cons.swig)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// estd session
app.use(session({
     secret: 'college',
     resave: false,
     saveUninitialized: false,
     cookie: {
        maxAge: 60 * 1000 * 30
     }
}));

app.use('/', pageRouter);

// error: page not found
app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
});

// handling error
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message)
});


// setting up the server
app.listen(5501, () =>{
    console.log("server is running on 5501");
});

module.exports = app;
