var express = require('express');
var mysql = require('mysql');
var router = express.Router();

router.get('/get', function(req, res, next) {
    var con = mysql.createConnection({
        host: "sql9.freemysqlhosting.net",
        user: "sql9382502",
        password: "N39tmQMhry",
        database: "sql9382502"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("GETTTTTYTT")
        con.query("SELECT * FROM budget WHERE id = '" + req.query.id + "';", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            results = result.map(v => Object.assign({}, v));
            console.log(results[0]);
            con.end(function(err) {
                console.log('connection ended');
                res.send(JSON.stringify(results[0]));
            });
        });
    });
});

router.post('/update', function(req, res, next) {
    console.log(req);
    var con = mysql.createConnection({
        host: "sql9.freemysqlhosting.net",
        user: "sql9382502",
        password: "N39tmQMhry",
        database: "sql9382502"
    });

    con.connect(function(err) {
        if (err) throw err;
        var sql = "UPDATE budget SET income = " + req.body.orderForm.income.value + ", " + 
                    "groceries = " + req.body.orderForm.groceries.value + ", " + 
                    "housing = " + req.body.orderForm.housing.value + ", " + 
                    "insurance = " + req.body.orderForm.insurance.value + ", " + 
                    "other = " + req.body.orderForm.other.value + ", " + 
                    "transportation = " + req.body.orderForm.transportation.value + ", " + 
                    "utilities = " + req.body.orderForm.utilities.value + " " + 
                    "WHERE id = '" + req.query.id+ ";'";
        console.log(sql)
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result.affectedRows + " record(s) updated");
            con.end(function(err) {
                console.log('connection ended');
            });
        });
    });
    res.send('respond with a update');
});

module.exports = router;
