const pool = require('./pool');

function Feedback() {}; 

Feedback.prototype = {
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
        var bind = [];

        for(prop in body){
            bind.push(body[prop]);
        }
        let sql = `INSERT INTO feedback(Feedname, Feedemail,  Feedphone_no, Feedreason) VALUES (?, ?, ?, ?)`;

        pool.query(sql, bind, function(err, result){
            if(err) throw err;

            callback(result.insertId);
        });
    }
}
module.exports = Feedback;