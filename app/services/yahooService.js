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
          var entity = json[ticker]
          var price = getPrice(entity);
          var change = getChange(entity);
          var changePercent = getChangePercent(entity);
          var atDate = getAtDate(entity);
          var atTime = getAtTime(entity);
          var longName = (getLongName(entity)) ? getLongName(entity) : getShortName(entity);
          var dayRange = getDayRange(entity);
          var fiftyTwoWeekRange = getFiftyTwoWeekRange(entity);

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
        var json = getQuoteDataFromBodyAsJson(body)
        var entity = json[ticker]
        var longName = (getLongName(entity)) ? getLongName(entity) : getShortName(entity)
        jsonPrices = getHistoricalDataFromBodyAsJson(body)

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

function getHistoricalDataFromBodyAsJson(body) {
  return JSON.parse(body.split("HistoricalPriceStore\":{\"prices\"\:")[1].split("}]")[0] + '}]');
}

function getPrice(entity) {
  return entity.regularMarketPrice.fmt;
}

function getChange(entity) {
  return parseFloat(entity.regularMarketChange.fmt);
}

function getChangePercent(entity) {
  return parseFloat(entity.regularMarketChangePercent.fmt);
}

function getAtDate(entity) {
  return entity.regularMarketTime.raw;
}

function getAtTime(entity) {
  return entity.regularMarketTime.fmt;
}

function getLongName(entity) {
  return entity.longName;
}

function getShortName(entity) {
  return entity.shortName;
}

function getDayRange(entity) {
  return entity.regularMarketDayRange.fmt;
}

function getFiftyTwoWeekRange(entity) {
  return entity.fiftyTwoWeekRange.fmt;
}