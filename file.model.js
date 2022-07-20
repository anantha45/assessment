const fileSchema = require("./schemas/fileSchema")
async function insertImage(data){
    try{
        const fileData = new fileSchema(data);
        const response = await fileData.save();

    }catch(err){
       throw {message : "Database error occured",status : 400};
    }
}
async function getAll(){
    try{
        const response = await fileSchema.find().select("name type path");
        return response;

    }catch(err){
       throw {message : "Database error occured",status : 400};
    }
}
async function getFile(searchParams,flag = 0){
    try{
        let response = {};
        if(flag == 1){
            response = await fileSchema.findOne({_id : searchParams.imageId},{ images: { $elemMatch: { width: Number(searchParams.width)} }});
        }
        else{
            response = await fileSchema.findOne(searchParams).select('images')
        }
        return response;

    }catch(err){
       throw {message : "Database error occured",status : 400};
    }
}
module.exports = {
    insertImage,
    getAll,
    getFile
}