#!/usr/bin/env node

const stocksCli = require('../cli/stocksCli')

var argv = require('yargs/yargs')(process.argv.slice(2))
    .usage('Usage: $0 -ticker [string] --historical [boolean]')
    .demandOption(['ticker'])
    .example('$0 -ticker <ticker> --historical', 'returns the price information of given ticker')
    .alias('t', 'ticker')
    .describe('t', 'Ticker of the stock from yahoo finance')
    .describe('historical', 'To get historical price information of the stock')
    .help('h')
    .alias('h', 'help')
    .alias('v', 'version')
    .argv;

if (argv.t || argv.ticker) {
    const ticker = argv.t || argv.ticker;
    if (argv.h || argv.historical) {
        stocksCli.fetchHistoricalPrices(ticker, {page: 1, limit: 10});
    } else {
        stocksCli.fetchCurrentPrice(ticker);
    }
}