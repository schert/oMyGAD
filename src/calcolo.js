var CONSTANT = require('./constant');
const axios = require('axios');
const logger = require('./logger');

function getGuadagno(returnFunction) {
    getCoinMatchetCupValue(CONSTANT.COINS_VALUE,function(coins) {
      var guadagno = 0;
      var investimentoInit = 0;
      var investimentoAttuale = 0;
      var guadagnoEUR = 0;
      var percentuale = 0;

      if(coins) {
        for (var key in CONSTANT.COINS_VALUE) {
          if (coins.hasOwnProperty(key.split('_')[0])) {
            var oldPrice = parseFloat(CONSTANT.COINS_VALUE[key].price_eur);
            var q = parseFloat(CONSTANT.COINS_VALUE[key].q);
            var newPrice  = parseFloat(coins[key.split('_')[0]].price_eur);
            if(oldPrice == null || newPrice == null) {
              continue;
            }

            if(CONSTANT.COINS_VALUE[key].sheet == 1) {
              investimentoAttuale +=  newPrice*q;
            }

            if(CONSTANT.COINS_VALUE[key].sheet == 0) {
              investimentoInit += oldPrice*q;
            }
          }
        }

        guadagnoEUR = investimentoAttuale - investimentoInit;
        percentuale = (guadagnoEUR/investimentoInit)*100;

        logger.info(new Date()+"", {percentuale: percentuale, euro: guadagnoEUR});

        returnFunction({percentuale: percentuale, euro: guadagnoEUR});
      }
      else {
        logger.error(CONSTANT.ERROR.NO_DATA);
        returnFunction(null);
      }
    });
};

function getCoinMatchetCupValue(coins,endFunction) {
    
    const rp = require('request-promise');
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
          'limit': '0',
           'convert': 'EUR'
         },
         headers: {
           'X-CMC_PRO_API_KEY': 'd067b75c-87d1-493e-8235-a187fc104cf0'
         },
        json: true,
        gzip: true
    };

rp(requestOptions).then(response => {
  var coinsResponse = response.data;
    var coinsMap = [];

    coinsResponse.forEach(function(item) {
      if(coins[item.id] != undefined) {
        coinsMap[item.id] = item;
      }
    });

    endFunction(coinsMap);
}).catch((err) => {
  logger.error(CONSTANT.ERROR.CMC_CONN_ERROR + ' - ' + error);
    endFunction(null);
});

/*axios.get(CONSTANT.CMC_CONN_CONFIG.url)
  .then(response => {

    var coinsResponse = response.data;
    var coinsMap = [];

    coinsResponse.forEach(function(item) {
      if(coins[item.id] != undefined) {
        coinsMap[item.id] = item;
      }
    });

    endFunction(coinsMap);
  })
  .catch(error => {
    logger.error(CONSTANT.ERROR.CMC_CONN_ERROR + ' - ' + error);
    endFunction(null);
  });
};*/

module.exports.getGuadagno = getGuadagno;
