const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/assessment', {useNewUrlParser: true});
const conn = mongoose.connection;
conn.on('connected', () => {
    console.log('database is connected successfully');
});
conn.on('disconnected',() =>{
    console.log('database is disconnected successfully');
})
conn.on('error', () =>{
    console.log("Error Occured")
});
module.exports = conn;