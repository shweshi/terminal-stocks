var Table = require('cli-table3');
var colors = require('colors');
colors.enable();

module.exports = {
  transformCurrentPrice: transformCurrentPrice,
  transformHistoricalPrices: transformHistoricalPrices,
  transformMarketSummary: transformMarketSummary,
  transformError: transformError
};

function transformMarketSummary(array) {
  var table = new Table({
    head: [
      colors.yellow('Stock Name'),
      colors.yellow('Current Price'),
      colors.yellow('Change'),
      colors.yellow('% Change'),
      colors.yellow('Date')
    ],
    style: {
      head: []
    },
  });

  array.forEach((data) => {
    table.push(
      [
        data.shortName,
        colors.cyan(data.price),
        (data.change < 0) ? colors.red(data.change) : colors.green(data.change),
        (data.changePercent < 0) ? colors.red(data.changePercent + '%') : colors.green(data.changePercent + '%'),
        colors.grey(new Date(Number(data.atDate * 1000)).toJSON().split("T")[0]),
      ]
    );
  });

  return '\n' + table.toString() + '\n'
    + colors.yellow(`TIP: You can view historical prices by: curl https://terminal-stocks.herokuapp.com/historical/ITC.NS\n\n`)
    + colors.blue.dim(`DISCLAIMER: For information purpose. Do not use for trading.\n`
      + colors.yellow.dim(`[twitter: @imSPG] [https://github.com/shweshi/terminal-stocks]\n\n`));
}

function transformCurrentPrice(data) {
  const hex = (data.change > 0) ? '008000' : 'FF0000';

  var table = new Table({
    head: [
      colors.yellow('Stock Name'),
      colors.yellow('Current Price'),
      colors.yellow('Change'),
      colors.yellow('% Change'),
      colors.yellow('Day Range'),
      colors.yellow('52 Week Range')
    ],
    style: {
      head: []
    },
  });

  table.push(
    [
      data.longName,
      colors.cyan(data.price),
      (data.change < 0) ? colors.red(data.change) : colors.green(data.change),
      (data.changePercent < 0) ? colors.red(data.changePercent) : colors.green(data.changePercent),
      data.dayRange,
      data.fiftyTwoWeekRange,
    ]
  );

  return '\n' + table.toString() + '\n' + colors.grey(colors.grey(data.atDate)) + '\n\n'
    + colors.yellow(`TIP: You can view historical prices by: curl https://terminal-stocks.herokuapp.com/historical/${data.ticker}\n\n`)
    + colors.blue.dim(`DISCLAIMER: For information purpose. Do not use for trading.\n`
      + colors.yellow.dim(`[twitter: @imSPG] [https://github.com/shweshi/terminal-stocks]\n\n`));
}

function transformHistoricalPrices(data) {
  const hex = (data.change > 0) ? '008000' : 'FF0000';

  var table = new Table({
    head: [
      colors.yellow('Date'),
      colors.yellow('Open'),
      colors.yellow('High'),
      colors.yellow('Low'),
      colors.yellow('Close*'),
      colors.yellow('Adj Close**'),
      colors.yellow('Volume')
    ],
    style: {
      head: []
    },
  });

  data.array.forEach((price) => {
    table.push(
      [
        new Date(Number(price.date * 1000)).toJSON().split("T")[0],
        parseFloat(price.open).toFixed(2),
        parseFloat(price.high).toFixed(2),
        parseFloat(price.low).toFixed(2),
        parseFloat(price.close).toFixed(2),
        parseFloat(price.adjclose).toFixed(2),
        price.volume
      ]
    );
  })

  return `Name: ${data.longName} \n\n` + table.toString() + '\n'
    + colors.yellow(`By default it show 10 entries to see the next entries make next call with ?page=2 and next with ?page=3\n\n`)
    + colors.blue(`* Close price adjusted for splits.\n** Adjusted close price adjusted for both dividends and splits.\n\n`)
    + colors.yellow(`TIP: You can view current price by: curl https://terminal-stocks.herokuapp.com/${data.ticker}\n\n`)
    + colors.blue.dim(`DISCLAIMER: For information purpose. Do not use for trading.\n`
      + colors.yellow.dim(`[twitter: @imSPG] [https://github.com/shweshi/terminal-stocks]\n`));
}

function transformError(error) {
  return `\nSorry, we couldn't find. Please check the stock ticker and provide correct one.\n\n` + error;
}