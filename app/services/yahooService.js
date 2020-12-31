var request = require('request');
const baseUrl = 'https://finance.yahoo.com/quote/';

module.exports = {
  getCurrentPrice: getCurrentPrice,
  getHistoricalPrices: getHistoricalPrices
};

function getCurrentPrice(ticker) {
  return new Promise(function (resolve, reject) {
    request(baseUrl + ticker + "/", function (err, res, body) {

      if (err) {
        reject(err);
      }

      try {
        var price = body.split(`"${ticker}":{"sourceInterval"`)[1]
          .split("regularMarketPrice")[1]
          .split("fmt\":\"")[1]
          .split("\"")[0];

        var change = parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
          .split("regularMarketChange")[1]
          .split("fmt\":\"")[1]
          .split("\"")[0]);

        var changePercent = parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
          .split("regularMarketChangePercent")[1]
          .split("fmt\":\"")[1]
          .split("\"")[0]);

        var atDate = body.split(`"${ticker}":{"sourceInterval"`)[1]
          .split("regularMarketTime")[1]
          .split(":{\"raw\":\"")[0]
          .split(":{\"raw\":")[1]
          .split("\"")[0]
          .split(',')[0];

        var atTime = body.split(`"${ticker}":{"sourceInterval"`)[1]
          .split("regularMarketTime")[1]
          .split("fmt\":\"")[1]
          .split("\"")[0];

        var longName = body.split(`"${ticker}":{"sourceInterval"`)[1]
        .split("longName")[1]
        .split(":")[1]
        .split(",")[0].replace(/"/g, '');

        var dayRange = body.split(`"${ticker}":{"sourceInterval"`)[1]
        .split("regularMarketDayRange")[1]
        .split("fmt\":\"")[1]
        .split("\"")[0];

        var fiftyTwoWeekRange = body.split(`"${ticker}":{"sourceInterval"`)[1]
        .split("fiftyTwoWeekRange")[1]
        .split("fmt\":\"")[1]
        .split("\"")[0];

        resolve({
          ticker,
          longName,
          price,
          change,
          changePercent,
          atDate: new Date(atDate*1000),
          atTime,
          dayRange,
          fiftyTwoWeekRange,
        });
      } catch (err) {
        reject(err)
      }
    });
  })
}


function getHistoricalPrices(ticker, options) {
  return new Promise(function (resolve, reject) {
    const {page, limit} = options;
    request(baseUrl + ticker + "/history", function (err, res, body) {

      if (err) {
        reject(err);
      }

      try {
        var longName = body.split(`"${ticker}":{"sourceInterval"`)[1]
        .split("longName")[1]
        .split(":")[1]
        .split(",")[0].replace(/"/g, '');

        var prices = body.split("HistoricalPriceStore\":{\"prices\"\:")[1].split("}]")[0]+ '}]';

        jsonPrices = JSON.parse(prices);

        const array = jsonPrices.slice((page - 1) * limit, page * limit);
        resolve({longName, ticker, array});
      } catch (err) {
        reject(err)
      }
    });
  })
}