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
          var json = getQuoteDataFromBodyAsJson(body)
          var price = getPrice(json[ticker]);
          var change = getChange(json[ticker]);
          var changePercent = getChangePercent(json[ticker]);
          var atDate = getAtDate(json[ticker]);
          var atTime = getAtTime(json[ticker]);
          var longName = (getLongName(json[ticker])) ? getLongName(json[ticker]) : getShortName(json[ticker]);
          var dayRange = getDayRange(json[ticker]);
          var fiftyTwoWeekRange = getFiftyTwoWeekRange(json[ticker]);

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
function getQuoteDataFromBodyAsJson(body) {
  const dataStore = body
                    .split(`"StreamDataStore":`)[1]
                    .split(`,"QuoteSummaryStore"`)[0];
  return JSON.parse(dataStore)['quoteData'];
}

function getPrice(entity) {
  return entity.regularMarketPrice.fmt;
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketPrice")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}

function getChange(entity) {
  return parseFloat(entity.regularMarketChange.fmt);
  return parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketChange")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0]);
}

function getChangePercent(entity) {
  return parseFloat(entity.regularMarketChangePercent.fmt);
  return parseFloat(body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketChangePercent")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0]);
}

function getAtDate(entity) {
  return entity.regularMarketTime.raw;
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketTime")[1]
    .split(":{\"raw\":\"")[0]
    .split(":{\"raw\":")[1]
    .split("\"")[0]
    .split(',')[0];
}

function getAtTime(entity) {
  return entity.regularMarketTime.fmt;
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketTime")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}

function getLongName(entity) {
  return entity.longName;
  const dataStore = body.split(`"StreamDataStore":`)[1];
  const quoteData = dataStore.split(`,"QuoteSummaryStore"`)[0];
  const quoteDataAsJSON = JSON.parse(quoteData);
  return dataStore
    .split("longName")[1]
    .split(":")[1]
    .split(",")[0]
    .replace(/"/g, '');
}

function getShortName(entity) {
  return entity.shortName;
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("shortName")[1]
    .split(":")[1]
    .split(",")[0]
    .replace(/"/g, '')
    .replace(/\u002/, '-');
}

function getDayRange(entity) {
  return entity.regularMarketDayRange.fmt;
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("regularMarketDayRange")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}

function getFiftyTwoWeekRange(entity) {
  return entity.fiftyTwoWeekRange.fmt;
  return body.split(`"${ticker}":{"sourceInterval"`)[1]
    .split("fiftyTwoWeekRange")[1]
    .split("fmt\":\"")[1]
    .split("\"")[0];
}