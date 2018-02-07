var xlsObj = require('./readFromExcel.js');

var CMC_CONN_CONFIG = {
  url : "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0",
  port : 80,
  method: 'GET'
};
var CMC_CONN_ERROR = "Errore di connessione con Coin Market Cup!";
var NO_DATA = "Nessun dato disponibile";
module.exports.COINS_VALUE = xlsObj;
module.exports.CMC_CONN_CONFIG = CMC_CONN_CONFIG;
module.exports.CMC_CONN_ERROR = CMC_CONN_ERROR;
module.exports.NO_DATA = NO_DATA;
