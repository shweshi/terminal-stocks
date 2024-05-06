var Table = require('cli-table3');
var colors = require('colors');
colors.enable();
var blessed = require('blessed');
var contrib = require('blessed-contrib');
var AU = require('ansi_up');

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

module.exports = {
  transformCurrentPrice: transformCurrentPrice,
  transformHistoricalPrices: transformHistoricalPrices,
  transformMarketSummary: transformMarketSummary,
  transformError: transformError,
  transformChart: transformChart,
  transformExportJsonSuccess: transformExportJsonSuccess,
  transformExportCsvSuccess: transformExportCsvSuccess,
};

function transformChart(data) {
  var time = data.timestamp.map((t) => { return new Date().toLocaleString('en-UK', {year: 'numeric', month: 'short', day: 'numeric'}) });

  const screen = blessed.screen()
  const line = contrib.line(
    {
      style:
      {
        line: "yellow",
        text: "green",
        baseline: "black"
      },
      xLabelPadding: 3,
      xPadding: 5,
      label: 'ITC'
    }), linedata = {
      x: time,
      y: data.indicators.quote[0].volume
    }

  screen.append(line)
  line.setData([linedata])
  screen.key(['escape', 'q', 'C-c'], function (ch, key) {
    return process.exit(0);
  });
  screen.render();
}

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
        colors.grey(data.atDate),
      ]
    );
  });

  return '\n' + table.toString() + '\n'
    + colors.yellow(`TIP: You can view historical prices by: curl terminal-stocks.dev/historical/ITC.NS\n\n`)
    + colors.blue.dim(`DISCLAIMER: For information purpose. Do not use for trading.\n`
      + colors.yellow.dim(`[twitter: @imSPG] [Github: https://github.com/shweshi/terminal-stocks]\n\n`));
}

function transformCurrentPrice(data) {
  var table = new Table({
    head: [
      colors.yellow('Stock Name'),
      colors.yellow('Current Price'),
      colors.yellow('Change'),
      colors.yellow('% Change'),
      colors.yellow('Day Range'),
      colors.yellow('52 Week Range'),
      colors.yellow('Market State')
    ],
    style: {
      head: []
    },
  });

  for (let i = 0; i < data.length; i++) {
    const hex = (data[i].change > 0) ? '008000' : 'FF0000';
    table.push(
      [
        data[i].longName,
        colors.cyan(data[i].price),
        (data[i].change < 0) ? colors.red(formatter.format(data[i].change)) : colors.green(formatter.format(data[i].change)),
        (data[i].changePercent < 0) ? colors.red(data[i].changePercent) : colors.green(data[i].changePercent),
        showDefaultOutputIfEmpty(data[i].dayRange),
        showDefaultOutputIfEmpty(data[i].fiftyTwoWeekRange),
        (data[i].marketState === "open") ? colors.green("open") : colors.red("closed"),
      ]
    );
  }

  return '\n' + table.toString() + '\n' + colors.grey(colors.grey(data[0].atDate)) + '\n\n'
    + colors.yellow(`TIP: You can view historical prices by: curl terminal-stocks.dev/historical/${data[0].ticker}\n\n`)
    + colors.blue.dim(`DISCLAIMER: For information purpose. Do not use for trading.\n`
      + colors.yellow.dim(`[twitter: @imSPG] [Github: https://github.com/shweshi/terminal-stocks]\n\n`));
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
        price.date.toLocaleString('en-UK', {year: 'numeric', month: 'short', day: 'numeric'}),
        formatter.format(parseFloat(price.open).toFixed(2)),
        formatter.format(parseFloat(price.high).toFixed(2)),
        formatter.format(parseFloat(price.low).toFixed(2)),
        formatter.format(parseFloat(price.close).toFixed(2)),
        formatter.format(parseFloat(price.adjClose).toFixed(2)),
        formatter.format(price.volume)
      ]
    );
  })

  return `Name: ${data.longName} \n\n` + table.toString() + '\n'
    + colors.yellow(`By default it show 10 entries to see the next entries make next call with ?page=2 and next with ?page=3\n\n`)
    + colors.blue(`* Close price adjusted for splits.\n** Adjusted close price adjusted for both dividends and splits.\n\n`)
    + colors.yellow(`TIP: You can view current price by: curl terminal-stocks.dev/${data.ticker}\n\n`)
    + colors.blue.dim(`DISCLAIMER: For informational purpose only. Do not use for trading.\n`
      + colors.yellow.dim(`[twitter: @imSPG] [Github: https://github.com/shweshi/terminal-stocks]\n`));
}

function showDefaultOutputIfEmpty(data) {
  if (!data)
    return 'N/A'

  return data
}

function transformError(error) {
  return `\nSorry, we couldn't find. Please check the stock ticker and provide correct one.\n\n ${error.message}`;
}

function transformExportJsonSuccess() {
  return `\nExported to json successfully.\nStored in: ${process.cwd()}\n`;
}

function transformExportCsvSuccess() {
  return `\nExported to csv successfully.\nStored in: ${process.cwd()}\n`;
}