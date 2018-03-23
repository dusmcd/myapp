let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'MyNewPass',
    database : 'myapp'
});

// constructor that can create a new table in mySQL DB

function Model(obj, table) {
    let _this = this;
    this.tableName = table + 's'
    let queryString = 'CREATE TABLE ' + this.tableName + '(ID int NOT NULL AUTO_INCREMENT, ';
    
    // attach fields as properties to Model object, and
    // create queryString to create table in DB
    Object.keys(obj).forEach(function(key) {
        _this[key] = {type: obj[key], data: []};
        queryString += key + ' ' + _this[key].type + ', ';
    });

    queryString += 'PRIMARY KEY (ID))';
    this.ID = {type: 'int', data: []};
    this.queryString = queryString;
    
}

Model.prototype.save = function(addId) {
    // if (addId) {
    //     this.queryString = 'SELECT ID FROM ' + this.tableName;
    // }
    connection.query(this.queryString, function(err, results) {
        if (err) {
            throw err;
        }
    });
    // connection.end();
}

Model.prototype.new = function(obj, callback) {
    let queryString = 'INSERT INTO ' + this.tableName + '(';
    let values = '';
    let fields = Object.keys(obj).join(', ');

    Object.keys(obj).forEach(function(key, i, arr) {
        // condition adds double quotes for string types
        values += typeof obj[key] === 'string' ? '"' + obj[key] + '"' : obj[key];
        if (i !== arr.length - 1) {
            values += ', ';
        }
    });

    queryString += fields + ') VALUES (' + values + ')';
    this.queryString = queryString;
}

Model.prototype.find = function(fields, conditions, callback) {
    let fieldString = fields.join(', ');
    let queryString = 'SELECT ' + fieldString + ' FROM ' + this.tableName + ' WHERE ';

    Object.keys(conditions).forEach(function(key, i, arr) {
        let value = typeof conditions[key] === 'string' ? '"' + conditions[key] + '"' : conditions[key];
        queryString += key + ' = ' + value;
        if (i !== arr.length - 1) {
            queryString += 'AND ';
        }
    });

    connection.query(queryString, function(err, results) {
        if (err) {
            callback(err, null);
        }
        callback(false, results);
    });
    // connection.end();
}


module.exports = Model;