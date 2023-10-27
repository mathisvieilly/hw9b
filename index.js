const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.static('css'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/ex1', (req, res) => {
  res.sendFile(__dirname + '/views/ex1.html');
});

app.get('/ex2', (req, res) => {
  res.sendFile(__dirname + '/views/ex2.html');
});

app.get('/ex3', (req, res) => {
  res.sendFile(__dirname + '/views/ex3.html');
});


const listening = app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${listening.address().port}`);
});