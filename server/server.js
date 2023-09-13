const express = require("express");
const crud = require("./db/crud")
const dataBase = require("./db/createDB")
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
  console.log("hello world");
});

app.post("/add", crud.createRecord);

app.get("/start/intiate", async (req, res) => {
    await dataBase.createDatabase()
    await dataBase.createTables()
  res.status(200).send("data base created succsesfully")
});

app.listen(port, () => console.log("hello from server port 3000"));

// how to get body form request in express ?



