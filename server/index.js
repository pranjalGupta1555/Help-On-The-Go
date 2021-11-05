const express = require("express");
const cors = require("cors");
const db = require('./config/db');
// const dotenv = require('dotenv');

// dotenv.config();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
  }));
// api routes
app.use("/", require('./routes/route.js'));

app.get('/', (req, res) => {
  res.status(200).send('<h1> Welcome to Help-On-The-Go! </h1>')
})

// set port, listen for requests
const PORT = process.env.PORT || 3000;

db.on('error', (err)=>{
    console.log('Error connecting to the DB !');
})

db.once('open', () =>{
    app.listen(PORT, () => {
      console.log(`Successfully connected to the DB..! \nServer is running on port ${PORT}.`);
    });
})