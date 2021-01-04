var yahooService = require('../app/services/yahooService');
var responseTransformer = require('../app/transformer/responseTransformer');

module.exports = {
    fetchCurrentPrice: fetchCurrentPrice,
    fetchHistoricalPrices: fetchHistoricalPrices,
    fetchMarketSummary: fetchMarketSummary,
    fetchChart: fetchChart
};

function fetchCurrentPrice(tickers) {
    yahooService.getCurrentPrice(tickers)
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

function fetchMarketSummary() {
    yahooService.getMarketSummary()
        .then((data) => {
            console.log(responseTransformer.transformMarketSummary(data));
        }).catch((error) => {
            console.log(responseTransformer.transformError(error));
        });
}

function fetchChart(ticker) {
    yahooService.getChart(ticker)
        .then((data) => {
            responseTransformer.transformChart(data);
        }).catch((error) => {
            console.log(responseTransformer.transformError(error));
        });
}