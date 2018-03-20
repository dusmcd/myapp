const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      NewModel = require('./models/order');

// create new customer model
// const Transaction = new NewModel({
//     transactionId: 'int',
//     payment: 'varchar(255)',
//     checkNum: 'varchar(255)'
// }, 'Customer');


// Transaction.save();



app.listen(8080, 'localhost', function() {
    console.log('The server is listening on port 8080');
});