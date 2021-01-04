# Using terminal-stocks CLI

You can use the terminal-stocks command line interface (cli) by installing.

## install cli globaly
```sh
npm i terminal-stocks -g
```

## Get current price
Get the current price information of the stock. You need to provide ticker.

```sh
terminal-stocks --ticker <TICKER>
```

Example:
```sh
terminal-stocks --ticker ITC.NS
```
can be called with -t

Example:
```sh
terminal-stocks -t ITC.NS
```

<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Current.png" />

## Get current price of multiple stocks at once
Get the current price information of the multiple stocks. You need to provide ticker separated by comma.

```sh
terminal-stocks --tickers <TICKER1,TICKER2>
```

Example:
```sh
terminal-stocks --tickers ITC.NS,INFY.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_MultipleStocks.png" />

## Get historical price data of stock
Get the historical price information of the stocks.

```sh
terminal-stocks --ticker <TICKER> --historical
```

Example:
```sh
terminal-stocks --ticker ITC.NS --historical
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Historical.png" />

## Get the global market summary
Get the global market summary.

```sh
terminal-stocks --market
```

Example:
```sh
terminal-stocks --market
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Market.png" />

## PRO TIP
You can fetch the market (Sensex, Nify 50, Dow) information also by providing as ticker in current price api
 ```sh
terminal-stocks --ticker <TICKER>
```

Example:
```sh
terminal-stocks --ticker ^BSENS
```