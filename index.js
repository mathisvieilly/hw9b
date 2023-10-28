const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const app = express();

const upload = multer();

app.use(express.static('public'));
app.use(express.static('css'));

const articles = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/ex1', (req, res) => {
  res.sendFile(__dirname + '/views/ex1.html');
});

app.post('/ex1/order', upload.array(), (req, res) => {
  res.send(`${req.body.name}, Thank you for your order. We will keep you posted on delivery status at ${req.body.email}.`);
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

app.post('/articles', upload.array(), (req, res) => {
  let higherId = Math.max(...articles.map(article => article.id));
  if (higherId === -Infinity) {
    higherId = 0;
  }
  articles.push({
    id: higherId + 1, // articles.length + 1,
    title: req.body.title,
    content: req.body.content
  });
  res.send(`New article added successfully with title ${req.body.title} and ID ${higherId + 1}`);
});

const listening = app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${listening.address().port}`);
});