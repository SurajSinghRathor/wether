const express = require("express");
const path = require('path');
const ejs = require('ejs');
const https = require('https');
const fs = require('fs');
const {
    log
} = require("console");

const app = express();

//middleware
app.use(express.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/login', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    if (user === "suraj" && password === "123") {
        res.redirect('/my-account');
    }
});

app.get('/my-account', (req, res) => {
    res.send("Welcome to your account");
});

app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



const options = {
    key: fs.readFileSync('/Users/suraj/private-key.pem'),
    cert: fs.readFileSync('/Users/suraj/certificate.pem')
};

const server = https.createServer(options, app);

server.listen(3000, () => {
    console.log('Server running on https://localhost:3000');
});


app.get('/home', (req, res) => {

    const lat = req.query.latitude
    const lon = req.query.longitude

    //passing the input data to api and then return the asked data to user again
    //calling the api 
    console.log(lat , lon);
    const api_id = "b4d39401f1ea7db8c43dfb4d57568091";
    const api_url = "https://api.openweathermap.org/data/2.5/weather?lat=12.32&lon=54.24&appid=b4d39401f1ea7db8c43dfb4d57568091";
    console.log(api_url);
    let sky , temp , wind , title;
    fetch(api_url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the JSON from the response
        })
        .then(data => {
            // Handle the data from the API
             sky = data.weather[0].description
             wind = data.wind.speed
             temp = data.main.temp
             title = "amazon"

            res.render('wether' , {title , sky , wind , temp})



        })
        .catch(error => {
            // Handle errors during the fetch
            console.error('Fetch error:', error);
        });


});