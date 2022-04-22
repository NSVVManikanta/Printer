const express = require('express');
// const printerGroups = require('./models/PrinterGroups');
// const printerGroupTriggers = require('./models/PrinterGroupTriggers');
 const sequelize = require('./util/database');
 const route = require('./Routes/route');
const app = express();


app.use(express.json());




app.listen(8080,()=>{
    console.log('Sever running on 8080!');
});