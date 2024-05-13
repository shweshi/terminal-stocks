# terminal-stocks

terminal-stocks is a terminal first application that provides stock price information.
Read more here: https://blog.shashi.dev/2021/01/track-stock-market-information-right-in.html

<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Current.png" />

### Documentation
https://shashi.dev/terminal-stocks

### How to use
```sh
$ curl terminal-stocks.dev/<TICKER>
```

### Example
```sh
$ curl terminal-stocks.dev/ITC.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Current.png" />

### TIP
- You can also pass comma separated list of tickers
```sh
$ curl terminal-stocks.dev/ITC.NS,INFY.NS,WIPRO.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_List.png" />

### Note
- This app uses https://finance.yahoo.com/ to fetch information. Please provide a ticker symbol from yahoo finance to fetch the ticker's market data


### CLI Usage
You can use the terminal-stocks command line interface (cli)

- install cli globaly
```sh
npm i terminal-stocks -g
```

- run the commands to get informations
###### Available commands
```sh
terminal-stocks --help // to get help
terminal-stocks --version  // to see the version
terminal-stocks -t [ticker] // to see current price information of the stock
terminal-stocks --ticker [ticker] // to see current price information of the stock
terminal-stocks --ticker -ms [ticker] // to see current price information of the stock, including market state (open/closed)
terminal-stocks -t [ticker] --historical [domain] // to see the historical price information of stock
terminal-stocks --tickers ITC.NS,INFY.NS // to get the current prices of the multiple stocks
terminal-stocks -m // to see the market summary
terminal-stocks --market // to see the market summary
terminal-stokcs --market --json // to export the data as json file
terminal-stokcs --market --csv // to expor the data as csv file
```

### Example
```sh
terminal-stocks -t ITC.NS
```

### View Historical data
### Example
```sh
$ curl terminal-stocks.dev/historical/ITC.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Historical.png" />

- By default it shows 10 entries. This api is paginated so you can use ?page=2 to view next entries.

### View Market Summary
### Example
```sh
$ curl terminal-stocks.dev/market-summary
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Market.png" />


### Tech
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [node-yahoo-finance2] - community API for Yahoo-Finance

### Installation
Requires [Node.js](https://nodejs.org/) v8+ to run.
Install the dependencies and devDependencies and start the server.

```sh
$ git clone "https://github.com/shweshi/terminal-stocks"
$ npm install
$ npm run serve
```
### Development
Want to contribute? Great! Feel free to open a PR.

### Support
<a href="https://www.producthunt.com/posts/terminal-stocks?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-terminal-stocks" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=281388&theme=dark" alt="Terminal Stocks - Track stock market right in your terminal | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

<a href="https://www.buymeacoffee.com/shashi" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a> 

### Happy Coding!!!
