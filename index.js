const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

const upload = multer();

app.use(express.static('public'));
app.use(express.static('css'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/ex1', (req, res) => {
  res.sendFile(__dirname + '/views/ex1.html');
});

app.post('/ex1/order', upload.array(), (req, res) => {
  res.send(`${req.body.name}, Thank you for your order. We will keep you posted on delivery statut at ${req.body.email}.`);
});

app.get('/ex2', (req, res) => {
  res.sendFile(__dirname + '/views/ex2.html');
});

app.post('/api/countries', jsonParser, (req, res) => {
  const name = req.body.name;
  const countries = req.body.countries;
  res.send(`Your name is ${name} and you visited ${countries.length} countries. Keep traveling!`);
});

app.get('/ex3', (req, res) => {
  res.sendFile(__dirname + '/views/ex3.html');
});


const listening = app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${listening.address().port}`);
});