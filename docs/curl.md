# Using without installation

You can use terminal-stocks without installation in your terminal.
You just need to install curl in your machine.

```sh
sudo apt-get install curl
```

## Get current price
Get the current price information of the stock. You need to provide ticker.

```sh
curl terminal-stocks.shashi.dev/<TICKER>
```

Example:
```sh
curl terminal-stocks.shashi.dev/ITC.NS
```

<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Current.png" />

## Get current price of multiple stocks at once
Get the current price information of the multiple stocks. You need to provide ticker separated by comma.

```sh
curl terminal-stocks.shashi.dev/<TICKER1,TICKER2>
```

Example:
```sh
curl terminal-stocks.shashi.dev/ITC.NS,INFY.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_MultipleStocks.png" />

## Get historical price data of stock
Get the historical price information of the stocks.

```sh
curl terminal-stocks.shashi.dev/historical/<TICKER>
```

Example:
```sh
curl terminal-stocks.shashi.dev/historical/ITC.NS
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Historical.png" />

## Get the global market summary
Get the global market summary.

```sh
curl terminal-stocks.shashi.dev/market-summary
```

Example:
```sh
curl terminal-stocks.shashi.dev/market-summary
```
<img alt="terminal-stocks" src="https://raw.githubusercontent.com/shweshi/terminal-stocks/main/screenshots/Screenshot_Market.png" />

## PRO TIP
You can fetch the market (Sensex, Nify 50, Dow) information also by providing as ticker in current price api
 ```sh
curl terminal-stocks.shashi.dev/<TICKER>
```

Example:
```sh
curl terminal-stocks.shashi.dev/^BSENS
```