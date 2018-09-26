class Dbconnect {
    constructor(conn){
        var mysql = require('mysql');
        this.conn = mysql.createConnection({
            host    :   'localhost',
            user    :   'root',
            password:   '123',
            database:   'letterpdb'
        });

    }
    getConnection(){
        return this.conn;
    }
    
};
module.exports = Dbconnect;