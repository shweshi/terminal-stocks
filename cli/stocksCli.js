var yahooService = require('../app/services/yahooService');
var responseTransformer = require('../app/transformer/responseTransformer');

module.exports = {
    fetchCurrentPrice: fetchCurrentPrice,
    fetchHistoricalPrices: fetchHistoricalPrices
};

function fetchCurrentPrice(ticker) {
    yahooService.getCurrentPrice(ticker)
        .then((data) => {
            console.log(responseTransformer.transformCurrentPrice(data));
        }).catch((error) => {
            console.log(responseTransformer.transformError(error));
        });
}

function fetchHistoricalPrices(ticker, options) {
    yahooService.getHistoricalPrices(ticker, options)
        .then((data) => {
            console.log(responseTransformer.transformHistoricalPrices(data));
        }).catch((error) => {
            console.log(responseTransformer.transformError(error));
        });
}