const express = require('express');
const printerGroups = require('./models/PrinterGroups');
const triggers = require('./models/triggers');
const db = require('./util/database');
 const route = require('./Routes/route');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocs = yaml.load('./swagger.yaml');
const app = express();
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));

app.use(express.json());

 db.sequelize
  .sync()
  .then(()=>{
      console.log("Database and tables created!");
  }).catch(err=>console.log(err.original));

app.use('/',route);

app.listen(8080,()=>{
    console.log('Sever running on 8080!');
});
