const express = require('express');
const User = require('../core/User');
const Feedback = require('../core/feedback')
const Payment = require('../core/payment');
const { body } = require('express-validator');
const router = express.Router();
const user = new User();
const feedback = new Feedback();
const payment = new Payment();

// get index page
router.get('/', (req, res, next) => {
    let user = req.session.user;
    if(user){
        res.redirect('/home');
        return; 
    }
    res.render('index', {title: "My Application"});
})
router.get('/', (req, res, next) => {
    let feedback = req.session.user;
    if(feedback){
        res.redirect('/');
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
            // res.send("Logged in as: "+result.name);
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
        password: req.body.password,
        FatherName: req.body.FName,
        MothersName: req.body.MName,
        PhoneNumber:req.body.phno,
        aadharNumber: req.body.adno,
        address: req.body.address,
    };
    user.create(userInput, function(lastId){
        if(lastId) {

            user.find(lastId, function(result){
                req.session.user = result;
                req.session.opp = 0
                res.redirect('/');
            });
            // res.send("Registerd as: "+result.name);
        }else{
            console.log('error creating a new user...');
        }
    });
});


//post feedback data 
router.post('/FeedbakRegister', (req, res, next) => {
    let feedbackInput = {
        Feedname: req.body.feedname,
        Feedemail: req.body.feedMail,
        Feedphone_no: req.body.feedphone,
        Feedreason: req.body.feedreason
    };
    feedback.create(feedbackInput, function(lastId){
        if(lastId){
            feedback.find(lastId, function(result){
                req.session.feedback = result;
                req.session.opp = 0;
                res.redirect('/');
            });
        }else{
            console.log("Error accepting feedback!!");
        }
    });
});

router.post('/payment', (req, res, next) => {
    let paymentInput = {
        bill_name: req.body.billName,
        bill_mail: req.body.billMail,
        bill_Roll: req.body.billRoll,
        yearCollege: req.body.yrCollege,
        bill_card: req.body.billCard,
        bill_card_no: req.body.billCardNo,
        billExp: req.body.billExp,
        bill_Exp_year: req.body.billExpYear,
        bill_cvv: req.body.billCvv,
    };
    payment.create(paymentInput, function(lastId){
        if(lastId){
            payment.find(lastId, function(result){
                req.session.payment = result;
                req.session.opp = 0;
                res.redirect('/home');
            });
        }else{
            console.log("Error accepting payment!!");
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