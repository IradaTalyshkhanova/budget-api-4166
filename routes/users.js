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
    if (req.query!=null||req.query.email!=="undefined") {
    var sql = "INSERT IGNORE INTO budget (email, income, housing, utilities, transportation, insurance, other, lastupdated) " + 
                "VALUES ('" + req.query.email  + "', 0, 0, 0, 0, 0, 0, NULL);";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  }
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
    if (req.query!=null||req.query.email!=="undefined") {
      var sql = 'SELECT id FROM budget where email = "' + req.query.email + '";';
      con.query(sql, function (err, result) {
        if (err) throw err;
        if (result.length !== 0) {
        results = result.map(v => Object.assign({}, v));
        con.end(function(err) {
          console.log('connection ended');
          res.send({id: results[0].id});
        });
      } else {res.send({});}
      });
    }
  });
});

module.exports = router;
