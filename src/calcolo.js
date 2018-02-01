var CONSTANT = require('./constant');
const axios = require('axios');
const console = require('winston')

function getGuadagno(returnFunction) {
    getCoinMatchetCupValue(CONSTANT.COINS_VALUE,function(coins) {
      var guadagnoEUR = 0;
      var investimentoInit = 0;
      var percentuale = 0;

      if(coins) {
        for (var key in CONSTANT.COINS_VALUE) {
          if (coins.hasOwnProperty(key)) {
            var oldPrice = parseFloat(CONSTANT.COINS_VALUE[key].price_eur);
            var q = parseFloat(CONSTANT.COINS_VALUE[key].q);
            var newPrice  = parseFloat(coins[key].price_eur);
            if(oldPrice == null || newPrice == null) {
              continue;
            }

            guadagnoEUR +=  (newPrice - oldPrice)*q;
            investimentoInit += oldPrice*q;
          }
        }

        percentuale = (guadagnoEUR/investimentoInit)*100;

        console.log('info', new Date()+"", {percentuale: percentuale, euro: guadagnoEUR});

        returnFunction({percentuale: percentuale, euro: guadagnoEUR});
      }
      else {
        console.log('error', CONSTANT.NO_DATA);
        returnFunction(null);
      }
    });
};

function getCoinMatchetCupValue(coins,endFunction) {

axios.get(CONSTANT.CMC_CONN_CONFIG.url)
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
    console.log('error',CONSTANT.CMC_CONN_ERROR);
    endFunction(null);
  });
};

module.exports.getGuadagno = getGuadagno;
