var xlsObj = require('./readFromExcel.js');

var CMC_CONN_CONFIG = {
  url : "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0",
  port : 80,
  method: 'GET'
};

var ERROR = {
  CMC_CONN_ERROR : "Errore di connessione con Coin Market Cup!",
  NO_DATA : "Nessun dato disponibile",
};

module.exports.CMC_CONN_CONFIG = CMC_CONN_CONFIG;
module.exports.COINS_VALUE = xlsObj;
module.exports.ERROR = ERROR;
