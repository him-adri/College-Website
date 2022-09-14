const pool = require('./pool');
const bcrypt = require('bcrypt');

function User() {}; 

User.prototype = {
    find : function(user = null, callback)
    {
        if(user){
            var field = Number.isInteger(user) ? 'id' : 'email';
        }
        let sql = `SELECT * FROM users WHERE ${field} = ?`;

        pool.query(sql, user, function(err, result){
            if(err) throw err

            if(result.length){
                callback(result[0]);
            }else{
                callback(null);
            }
        });
    },
    create : function(body, callback){
        var pwd = body.password;
        body.password = bcrypt.hashSync(pwd,10);
         var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }
        // ,FName, MName,phno, adno, address
        let sql = `INSERT INTO users(name, email, password, FatherName,  MothersName,  aadharNumber, PhoneNumber, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        pool.query(sql, bind, function(err, result){
            if(err) throw err;

            callback(result.insertId);
        });
    },

    login : function(email, password, callback){
        this.find(email, function(user){
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}
module.exports = User;
