const express = require('express');
const { Server } = require('http');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const contactFormSchema = require('./models/contactFormShema')
const newUserSchema = require('./models/newUser')

const hostname = '127.0.0.1';
const port = 8080;

//MONGOOSE SPECIFIC CONFIGRATION
const db = 'mongodb://127.0.0.1:27017/MyLegaliaGym';

mongoose.set('strictQuery', false);
mongoose.connect(db, { useNewUrlParser: true }).then(() => {
    console.log("DB connected");
}).catch(() => {
    console.log("DB not connected");
})

//EXPRESS SPECIFIC CONFIGRATION
app.use('/static', express.static('static'));  //for serving static file
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//PUG SPECIFIC CONFIGRATION
app.set('view-engine', 'pug');  //set view engine as PUG
app.set('views', path.join(__dirname, 'views')); //join view

//END POINT

app.get('/', (req, res) => {
    const params = { 'title': 'Gym Of Hzb' }
    res.status(200).render('home.pug', params);
});

app.get('/about', (req, res) => {
    const params = { 'title': 'about-us' };
    res.status(200).render('about.pug', params);
});

app.get('/services', (req, res) => {
    const params = { 'title': 'our services' };
    res.status(200).render('services.pug', params);
});

app.get('/join', (req, res) => {
    const params = { 'title': 'join now' };
    res.status(200).render('join.pug', params);
});

app.get('/contact', (req, res) => {
    const params = { 'title': 'Contact' };
    res.status(200).render('contact.pug', params);
});

//API

//contact form api
app.post("/api/contact", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.Phone;
    const message = req.body.message;

    const contactForm = new contactFormSchema({
        name: name,
        email: email,
        phone: phone,
        message: message
    })
    try {
        const newContactForm = await contactForm.save();
        res.redirect("/contact");
        // console.log("data save sucessfully")
    } catch (err) {
        console.log(err);
    }
    
});

// new user api 
app.post("/api/newuser", async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.Phone;
    const way2contact = req.body.way2contact;
    // console.log(way2contact)

    const newUser = new newUserSchema({
        name: name,
        email: email,
        phone: phone,
        way2contact: way2contact
    })
    try {
        const newUsers = await newUser.save();
        res.redirect("/join");
        // console.log("data save sucessfully")
    } catch (err) {
        console.log(err);
    }
    
});

//LISTEN SERVER
app.listen(port, hostname, () => {
    console.log(`your app running on http://${hostname}:${port}/`);
})
