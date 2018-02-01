var express = require('express');
var path = require('path');
var Faccina = require('./bean/faccina');
var api = require('./calcolo');
const console = require('winston')
console.level = process.env.LOG_LEVEL

var app = express();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'bower_components')));
app.use(express.static(path.join(__dirname,'css')));

var faccina = new Faccina(100);

app.get('/', function (req, res) {
  res.render('index', {
    percentuale : " - ",
    status : faccina.getStatus(null)
  });
});


app.get('/load', function (req, res) {
  var retVal = api.getGuadagno(function(retVal) {
    res.json({
      percentuale : retVal!=null ? retVal.percentuale : " - ",
      euro: retVal!=null ? retVal.euro : " - ",
      status : retVal!=null ? faccina.getStatus(retVal.percentuale) : faccina.getStatus(null)
    });
  });
});

var port = process.env.PORT || 1337
app.listen(port, function() {
  console.log('info', 'ready on port ' + port);
});
