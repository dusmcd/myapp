const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      NewModel = require('./models/order');

// create new customer model
const Pizza = new NewModel({
    transactionId: 'int',
    payment: 'varchar(255)',
    checkNum: 'varchar(255)'
}, 'Pizza');


Pizza.new({
    transactionId: 5,
    payment: 'check',
    checkNum: '9'
});
// Pizza.save();



app.listen(8080, 'localhost', function() {
    console.log('The server is listening on port 8080');
});