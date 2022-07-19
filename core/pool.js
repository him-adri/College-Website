const util = require('util');
const mysql = require('mysql');
const { rootCertificates } = require('tls');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'tiger',
    database: 'kcc'
});

pool.getConnection((err, connection) => {
    if(err)
        console.error("Something went wrong");
    if(connection)
        connection.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;