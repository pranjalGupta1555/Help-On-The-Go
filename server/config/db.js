import configDb from './db.config.js';
import mongoose from 'mongoose';

// localhost

// mongoose.connect(`mongodb://${configDb.HOST}:${configDb.PORT}/${configDb.DB}`, { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//  })
// mongoose.connect("mongodb+srv://webdev2:Node%21112233@cluster0.iguyz.mongodb.net/test?authSource=admin",{
//     useFindAndModify: true,
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//   })

mongoose.connect(`mongodb://${configDb.HOST}:${configDb.PORT}/${configDb.DB}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

const db =  mongoose.connection

export default db;

