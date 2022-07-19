const mongoose = require('mongoose');
const processFileSchema = new mongoose.Schema({
    width : {type : Number, require : true},
    path: {type : String, require : true}
    
},{timestamps : {createdAt : "created_at", updatedAt : "updated_at"}});
const fileSchema = new mongoose.Schema({
    name: {type : String, require : true},
    path : {type : String, require : true},
    type: {type : String, require : true},
    images : [processFileSchema]
    
},{timestamps : {createdAt : "created_at", updatedAt : "updated_at"}});
module.exports = new mongoose.model('File', fileSchema);