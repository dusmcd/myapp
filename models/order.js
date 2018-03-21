let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'MyNewPass',
    database : 'myapp'
});

// constructor that can create a new table in mySQL DB
/* Need to attach the Id property to the new created model object.
Probably can attach manually since all models will have the primary key.
Can assign the AUTO_INCREMENT ID value to the object when query is run
*/

function NewModel(obj, table) {
    let _this = this;
    this.tableName = table + 's'
    let queryString = 'CREATE TABLE ' + this.tableName + '(ID int NOT NULL AUTO_INCREMENT, ';
    
    // attach fields as properties to NewModel object, and
    // create queryString to create table in DB
    Object.keys(obj).forEach(function(key) {
        _this[key] = {type: obj[key], data: []};
        queryString += key + ' ' + _this[key].type + ', ';
    });
    queryString += 'PRIMARY KEY (ID))';
    this.queryString = queryString;
    
}

NewModel.prototype.save = function() {
    connection.query(this.queryString, function(err, results) {
        if (err) {
            throw err;
        }
        console.log('Query executed successfully');
    });
    connection.end();
}

NewModel.prototype.new = function(obj, callback) {
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
    // console.log(this.queryString);
}



module.exports = NewModel;