# terminal-stocks

terminal-stocks is a terminal based application that provide stock price information.

Read more here: https://techaptitude.blogspot.com/2020/12/track-stock-market-information-right-in.html

<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Current.png" />

### How to use
```sh
$ curl https://terminal-stocks.herokuapp.com/<TICKER>
```

### Example
```sh
$ curl https://terminal-stocks.herokuapp.com/ITC.NS
```
### Note
- This app uses the yahoo finance to fetch information. Please provide ticker for yahoo finance.


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
terminal-stocks -t [ticker] --historical [domain] // to see the historical price information of stock
terminal-stocks -m // to see the market summary
terminal-stocks --market // to see the market summary
```

### Example
```sh
terminal-stocks -t ITC.NS
```

### View Historical data
### Example
```sh
$ curl https://terminal-stocks.herokuapp.com/historical/ITC.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Historical.png" />

- By default it shows 10 entries. This api is paginated so you can use ?page=2 to view next entries.

### View Market Summary
### Example
```sh
$ curl https://terminal-stocks.herokuapp.com/market-summary
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Market.png" />


### Tech
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]

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

### Happy Coding!!!
