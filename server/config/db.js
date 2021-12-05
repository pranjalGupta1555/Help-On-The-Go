import configDb from './db.config.js';
import mongoose from 'mongoose';

// localhost

// mongoose.connect(`mongodb://${configDb.HOST}:${configDb.PORT}/${configDb.DB}`, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//  })

mongoose.connect(`${configDb.URI}://${configDb.USERNAME}:${configDb.PASSWORD}@${configDb.HOST}/${configDb.DB}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

// mongoose.connect(`mongodb://${configDb.HOST}:${configDb.PORT}/${configDb.DB}`, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
// })

const db =  mongoose.connection

export default db;
