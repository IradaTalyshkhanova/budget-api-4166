var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET users listing. */
router.post('/register', function(req, res, next) {
  // create the budget entry
  var con = mysql.createConnection({
    host: "sql9.freemysqlhosting.net",
    user: "sql9382502",
    password: "N39tmQMhry",
    database: "sql9382502"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    console.log(req)
    var sql = "INSERT INTO budget (email, income, housing, utilities, transportation, insurance, other, lastupdated) " + 
                "VALUES ('" + req.query.email  + "', 0, 0, 0, 0, 0, 0, NULL);";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });
});

router.get('/login', function(req, res, next) {
  // create the budget entry
  var con = mysql.createConnection({
    host: "sql9.freemysqlhosting.net",
    user: "sql9382502",
    password: "N39tmQMhry",
    database: "sql9382502"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    console.log(req)
    var sql = 'SELECT id FROM budget where email = "' + req.query.email + '";';
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("got id");
      results = result.map(v => Object.assign({}, v));
      con.end(function(err) {
        console.log('connection ended');
        res.send(JSON.stringify(results[0]));
      });
    });
  });
});

module.exports = router;
