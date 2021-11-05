const configDb = require('./db.config.js');
const mongoose = require("mongoose");

// localhost

// mongoose.connect(`mongodb://${configDb.HOST}:${configDb.PORT}/${configDb.DB}`, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//  })

mongoose.connect(`${configDb.URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const db =  mongoose.connection

module.exports = db;

