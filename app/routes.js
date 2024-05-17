var yahooService = require('../app/services/yahooService');
var responseTransformer = require('../app/transformer/responseTransformer');

module.exports = function (app) {
  app.get('/market-summary', function (req, res) {
    yahooService.getMarketSummary()
      .then((data) => {
        res.send(responseTransformer.transformMarketSummary(data));
      }).catch((error) => {
        res.send(responseTransformer.transformError(error));
      });
  });

  app.get('/:tickers', function (req, res) {
    const tickers = req.params.tickers.split(',').map((ticker) => ticker.trim());
    const ms = req.query.ms ? req.query.ms.toLowerCase() : undefined;
    var options = {};

    // check to see if market state param was set
    if (ms === 'true') {
      options = { ms: true };
    }

    yahooService.getCurrentPrice(tickers)
      .then((data) => {
        res.send(responseTransformer.transformCurrentPrice(data, options));
      }).catch((error) => {
        res.send(responseTransformer.transformError(error));
      });
  });

  app.get('/historical/:ticker', function (req, res) {
    const ticker = req.params.ticker;

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = 10;


    yahooService.getHistoricalPrices(ticker, { page, limit })
      .then((data) => {
        res.send(responseTransformer.transformHistoricalPrices(data));
      }).catch((error) => {
        res.send(responseTransformer.transformError(error));
      });
  });
};