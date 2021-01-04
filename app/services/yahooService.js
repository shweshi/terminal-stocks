var request = require('request');
const baseUrl = 'https://finance.yahoo.com/quote/';

module.exports = {
  getCurrentPrice: getCurrentPrice,
  getHistoricalPrices: getHistoricalPrices,
  getMarketSummary: getMarketSummary,
  getChart: getChart
};

function getChart(ticker) {
  return new Promise(function (resolve, reject) {
    request('https://query1.finance.yahoo.com/v8/finance/chart/' + ticker, function (err, res, body) {
      if (err) {
        reject(err);
      }

      try {
        const chartData = JSON.parse(body);
        resolve(chartData.chart.result[0]);
      } catch (error) {
        reject(error);
      }
    });
  });
}

function getCurrentPrice(tickers) {
  const dataPromise = tickers.map((ticker) => {
    return new Promise(function (resolve, reject) {
      request(baseUrl + ticker + "/", function (err, res, body) {

        if (err) {
          reject(err);
        }

        try {
          var price = getPrice(body, ticker);
          var change = getChange(body, ticker);
          var changePercent = getChangePercent(body, ticker);
          var atDate = getAtDate(body, ticker);
          var atTime = getAtTime(body, ticker);
          var longName = getLongName(body, ticker);
          var dayRange = getDayRange(body, ticker);
          var fiftyTwoWeekRange = getFiftyTwoWeekRange(body, ticker);

          resolve({
            ticker,
            longName,
            price,
            change,
            changePercent,
            atDate: new Date(atDate * 1000),
            atTime,
            dayRange,
            fiftyTwoWeekRange,
          });
        } catch (err) {
          reject(err)
        }
      })
    });
  });

  return Promise.all(dataPromise);
}

function getMarketSummary() {
  return new Promise(function (resolve, reject) {
    request('https://in.finance.yahoo.com', function (err, res, body) {

      if (err) {
        reject(err);
      }

      try {
        var data = body.split("MarketSummaryStore\":{\"data\"\:")[1].split("}]")[0] + '}]';
        json = JSON.parse(data);
        data = [];
        for (let ticker of json) {
          var shortName = getShortName(body, ticker.symbol);
          var price = getPrice(body, ticker.symbol);
          var change = getChange(body, ticker.symbol);
          var changePercent = getChangePercent(body, ticker.symbol);
          var atDate = getAtDate(body, ticker.symbol);
          data.push({ ticker: ticker.symbol, shortName, price, change, changePercent, atDate });
        }
        resolve(data);
      } catch (err) {
        reject(err)
      }
    });
  });
}


function getHistoricalPrices(ticker, options) {
  return new Promise(function (resolve, reject) {
    const { page, limit } = options;
    request(baseUrl + ticker + "/history", function (err, res, body) {

      if (err) {
        reject(err);
      }

      try {
        var longName = body.split(`"${ticker}":{"sourceInterval"`)[1]
          .split("longName")[1]
          .split(":")[1]
          .split(",")[0].replace(/"/g, '');

        var prices = body.split("HistoricalPriceStore\":{\"prices\"\:")[1].split("}]")[0] + '}]';

        jsonPrices = JSON.parse(prices);

        const array = jsonPrices.slice((page - 1) * limit, page * limit);
        resolve({ longName, ticker, array });
      } catch (err) {
        reject(err)
      }
    });
  })
}

// Helper functions
function getPrice(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketPrice")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}

function getChange(body, ticker) {
  return parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketChange")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0]);
}

function getChangePercent(body, ticker) {
  return parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketChangePercent")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0]);
}

function getAtDate(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketTime")[1]
    .split(":{\"raw\":\"")[0]
    .split(":{\"raw\":")[1]
    .split("\"")[0]
    .split(',')[0];
}

function getAtTime(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketTime")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}

function getLongName(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("longName")[1]
    .split(":")[1]
    .split(",")[0]
    .replace(/"/g, '');
}

function getShortName(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("shortName")[1]
    .split(":")[1]
    .split(",")[0]
    .replace(/"/g, '')
    .replace(/\u002/, '-');
}

function getDayRange(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketDayRange")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}

function getFiftyTwoWeekRange(body, ticker) {
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("fiftyTwoWeekRange")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}