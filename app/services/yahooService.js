var request = require('request');
const yahooFinance = require('yahoo-finance2').default;

const baseUrl = 'https://finance.yahoo.com/quote/'
const regex = /root.App.main\s*=\s*{(.*)};/g
const marketSummaryTickers = '^GSPC, ^DJI, ^IXIC, ^RUT, CL=F, GC=F, SI=F, EURUSD=X, GBPUSD=X, JPY=X, BTC-USD, ^CMC200, ^FTSE, ^N225'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const dateFormattingOptions = {
  timeZone: 'UTC',
  timeZoneName: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: false
};

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
    return new Promise(async function (resolve, reject) {
      try {
        var entity = await yahooFinance.quote(ticker)
        var price = getPrice(entity);
        var change = getChange(entity);
        var changePercent = getChangePercent(entity);
        var atDate = getAtDate(entity);
        var atTime = getAtTime(entity);
        var longName = (getLongName(entity)) ? getLongName(entity) : getShortName(entity);
        var dayRange = getDayRange(entity);
        var fiftyTwoWeekRange = getFiftyTwoWeekRange(entity);
        var marketState = getMarketState(entity)

        resolve({
          ticker,
          longName,
          price,
          change,
          changePercent,
          atDate,
          atTime,
          dayRange,
          fiftyTwoWeekRange,
          marketState

        })
      } catch (err) {
        reject(err)
      }
    })
  });

  return Promise.all(dataPromise);
}

function getMarketSummary() {
  let tickers = marketSummaryTickers.split(',').map((ticker) => ticker.trim())
  return new Promise(async function (resolve, reject) {
    try {
      var entities = await yahooFinance.quote(tickers)
      var data = [];
      for (let entity of entities) {
        var shortName = (getShortName(entity)) ? getShortName(entity) : getLongName(entity);
        shortName = (shortName) ? shortName : entity.symbol;
        var price = getPrice(entity);
        var change = getChange(entity);
        var changePercent = getChangePercent(entity);
        var atDate = getAtDate(entity);
        data.push({ ticker: entity.symbol, shortName, price, change, changePercent, atDate });
      }
      resolve(data);
    } catch (err) {
      reject(err)
    }
  });
}


function getHistoricalPrices(ticker, options) {
  return new Promise(async function (resolve, reject) {
    const { page, limit } = options;
    var today = new Date();
    var prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    const queryOptions = { period1: prevMonth.toISOString().slice(0, 10) };

    try {
      var quote = await yahooFinance.quote(ticker)
      var jsonPrices = await yahooFinance.historical(ticker, queryOptions)
      var longName = (getLongName(quote)) ? getLongName(quote) : getShortName(quote)

      const array = jsonPrices.reverse().slice((page - 1) * limit, page * limit);
      resolve({ longName, ticker, array });
    } catch (err) {
      reject(err)
    }
  });
}

function getPrice(entity) {
  return formatter.format(entity.regularMarketPrice);
}

function getChange(entity) {
  return parseFloat(entity.regularMarketChange).toFixed(2);
}

function getChangePercent(entity) {
  return parseFloat(entity.regularMarketChangePercent).toFixed(2);
}

function getAtDate(entity) {
return new Date(entity.regularMarketTime).toLocaleDateString('en-US', dateFormattingOptions)
}

function getAtTime(entity) {
  return entity.regularMarketTime;
}

function getLongName(entity) {
  return entity.longName;
}

function getShortName(entity) {
  return entity.shortName;
}

function getDayRange(entity) {
  if (entity.regularMarketDayRange) {
    return `${formatter.format(entity.regularMarketDayRange.low)} - ${formatter.format(entity.regularMarketDayRange.high)}`
  }
}

function getFiftyTwoWeekRange(entity) {
  if (entity.fiftyTwoWeekRange) {
    return `${formatter.format(entity.fiftyTwoWeekRange.low)} - ${formatter.format(entity.fiftyTwoWeekRange.high)}`
  }
}

function getMarketState(entity) {
  if( entity.marketState) {
    return (entity.marketState === "REGULAR") ? "open" : "closed" 
  }
}