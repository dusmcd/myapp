const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      Model = require('./models/order');




app.listen(8080, 'localhost', function() {
    console.log('The server is listening on port 8080');
});