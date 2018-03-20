let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'MyNewPass',
    database : 'myapp'
});

// need to create constructor that can create a new table

function NewModel(obj, table) {
    let _this = this;
    this.tableName = table + 's'
    let queryString = 'CREATE TABLE ' + this.tableName + '(';
    
    Object.keys(obj).forEach(function(key, i, arr) {
        _this[key] = {type: obj[key], data: []};
        queryString += key + ' ' + _this[key].type;
            if (!(i === arr.length - 1)) {
                queryString += ', ';
            }
    });
    queryString += ')';
    this.queryString = queryString;
    
}

NewModel.prototype.save = function() {
    connection.query(this.queryString, function(err, results) {
        if (err) {
            throw err;
        }
        console.log('New model created successfully');
    });
    connection.end();
}



module.exports = NewModel;