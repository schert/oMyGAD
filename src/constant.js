var CMC_CONN_CONFIG = {
  url : "https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=0",
  port : 80,
  method: 'GET'
};

var ERROR = {
  CMC_CONN_ERROR : "Errore di connessione con Coin Market Cup!",
  NO_DATA : "Nessun dato disponibile",
};

var EXCEL_VALUE = {
  ID_COLUMN : 1,
  PRICE_EUR_COLUMN : 4,
  PRICE_USD_COLUMN : 4,
  Q_COLUMN : 3,
  FOGLIO_START : 0,
  FOGLIO_END : 1,
  START : 1
};

module.exports.CMC_CONN_CONFIG = CMC_CONN_CONFIG;
module.exports.ERROR = ERROR;
module.exports.EXCEL_VALUE = EXCEL_VALUE;
module.exports.COINS_VALUE = require('./readFromExcel.js');
