const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('landing');
});


app.listen(8080, 'localhost', function() {
    console.log('The server is listening on port 8080');
});