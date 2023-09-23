const express = require("express");
const crud = require("./db/crud")
const dataBase = require("./db/createDB")
const app = express();
const port = 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("hello world");
  console.log("hello world");
});

app.post("/add", crud.createRecord);
app.post("/update", crud.updateRecord);

class tickersDTO {
  platform
  ticker
  baseAsset
  quoteAsset
}

app.post("/test", (req ,res) =>{
  let urlString = "wss://stream.binance.com:443/"
  let ticker = [{
    platform :"binance",
    ticker : "BNBUSDT",
    baseAsset : "BNB",
    quoteAsset : "USDT"
  },
  {
    platform :"binance",
    ticker : "BTCUSDT",
    baseAsset : "BTC",
    quoteAsset : "USDT"
  },]
  ticker.forEach((e)=>{
    urlString = urlString + e.ticker.toLowerCase() + "@kline_1s/"
  })
  console.log(urlString)
  res.send("test completed")
  //wss://stream.binance.com:443<symbol>@kline_<interval>

});


app.get("/start/intiate", async (req, res) => {
    await dataBase.createDatabase()
    await dataBase.createTables()
  res.status(200).send("data base created succsesfully")
});

app.listen(port, () => console.log("hello from server port 3000"));

// how to get body form request in express ?



