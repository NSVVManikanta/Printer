const express = require("express");
const app = express();

const printerControllers = require("../controllers/printer");

app.use(express.json());


// Printer

app.post("/createPrinter", printerControllers.create);

app.get("/albums",printerControllers.list);

app.put("/albums/:albumId",printerControllers.update);

app.delete("/albums/:albumId",printerControllers.updateTrigger);

module.exports = app;