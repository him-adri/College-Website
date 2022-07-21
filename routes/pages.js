const express = require('express');
const User = require('../core/User');
const router = express.Router();
const user = new User();

// get index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    if(user){
        res.redirect('/home');
        return; 
    }
    res.render('index', {title: "My Application"});
})

// get home page
router.get('/home',(req, res, next) => {
    // res.send("This is home page");
    let user = req.session.user;

    if(user){
        res.render('home', {opp:req.session.opp, name:user.name});
        // res.sendFile('views/home.html');
        return;
    }
    res.redirect('/');
});

// post login data
router.post('/login', (req, res, next) => {
    user.login(req.body.email, req.body.password, function(result){
        if(result){

            req.session.user = result;
            req.session.opp = 1
            res.redirect('/home');
            //res.send("Logged in as: "+result.name);
        }else{
            res.send('Username/ password incorrect!');
        }
    })
});

// post register data
router.post('/register', (req, res, next) => {
   
    let userInput = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    user.create(userInput, function(lastId){
        if(lastId) {

            user.find(lastId, function(result){
                req.session.user = result;
                req.session.opp = 0
            });
            // res.send("Registerd as: "+result.name);
        }else{
            console.log('error creating a new user...');
        }
    });
});
// logout
router.get('/loggout', (req, res, next) => {
    // Check if the session is exist
    if(req.session.user) {
        // destroy the session and redirect the user to the index page.
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;