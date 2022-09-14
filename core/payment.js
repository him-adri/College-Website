const { use } = require('../routes/pages');
const pool = require('./pool');


function Payment() {}; 

Payment.prototype = {
    find : function(Payment = null, user = null, callback)
    {
        if(Payment){
            var field = Number.isInteger(Payment) ? 'id' : 'email';
        }
        let sql = `SELECT * FROM payment WHERE ${field} = ?`;

        pool.query(sql, Payment, function(err, result){
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
        let sql = `INSERT INTO payment(bill_name, bill_mail, bill_Roll, bill_card, bill_card_no, billExp, bill_Exp_year, bill_cvv, payment_sts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)`; 

        pool.query(sql, bind, function(err, result){
            if(err) throw err;

            callback(result.insertId);
        });
    },
}
module.exports = Payment;