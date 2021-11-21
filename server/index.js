import app from './api/app.js';
import db from './config/db.js'

// Port at which the localhost server will be running
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