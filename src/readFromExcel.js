var xlsx = require('node-xlsx');
var objEx = xlsx.parse(__dirname + '/Portafoglio.xlsx');
var CONSTANT = require('./constant');

var obj = [];
var count = 0;

for(var sheet = CONSTANT.EXCEL_VALUE.FOGLIO_START; sheet<=CONSTANT.EXCEL_VALUE.FOGLIO_END;sheet++) {
  for(var i=CONSTANT.EXCEL_VALUE.START;i<objEx[CONSTANT.EXCEL_VALUE.FOGLIO_START].data.length;i++) {
    var row = objEx[sheet].data[i];
    var id = row[CONSTANT.EXCEL_VALUE.ID_COLUMN];
    if(id == '' || id == undefined || id == null) {
      continue;
    }

    if(obj[id]!= undefined) {
      id += '_'+(count++);
    }

    obj[id] = {
      "sheet" : sheet,
      "id" : row[CONSTANT.EXCEL_VALUE.ID_COLUMN],
      "price_usd": row[CONSTANT.EXCEL_VALUE.PRICE_USD_COLUMN],
      "price_eur": row[CONSTANT.EXCEL_VALUE.PRICE_EUR_COLUMN],
      "q" : row[CONSTANT.EXCEL_VALUE.Q_COLUMN],
    };
  }
}

module.exports = obj;
