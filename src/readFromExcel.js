var xlsx = require('node-xlsx');
var idColumn = 0;
var priceEurCol = 1;
var priceUsdCol = 2;
var qCol = 3;
var foglio = 0;
var start = 1;
var objEx = xlsx.parse(__dirname + '/Portafoglio.xlsx');

var obj = [];
for(var i=start;i<objEx[foglio].data.length;i++) {
  var row = objEx[foglio].data[i];
  obj[row[idColumn]] = {
    "id" : row[idColumn],
    "price_usd": row[priceUsdCol],
    "price_eur": row[priceEurCol],
    "q" : row[qCol],
  };
}

module.exports = obj;
