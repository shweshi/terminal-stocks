# terminal-stocks

terminal-stocks is a terminal based application that provide stock price information.

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

### View Historical data
### Example
```sh
$ curl https://terminal-stocks.herokuapp.com/historical/ITC.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Historical.png" />

- By default it shows 10 entries. This api is paginated so you can use ?page=2 to view next entries.

### CLI Usage
You can use the terminal-stocks command line interface (cli)
[![NPM](https://nodei.co/npm/terminal-stocks.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/terminal-stocks)

- install cli globaly
```sh
npm i terminal-stocks -g
```

```sh
terminal-stocks --help
terminal-stocks --version
terminal-stocks -t [ticker]
terminal-stocks -t [ticker] --historical [domain]
```

### Example
```sh
terminal-stocks -t ITC.NS
```

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
