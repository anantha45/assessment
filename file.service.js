const fileModel = require("./file.model")
const path = require('path')
const sharp = require("sharp");
const validTypes = ["jpg","jpeg","png"];
async function saveFile(reqBody){
    try{
        const fileType = reqBody.file.mimetype.split("/")
        if(validTypes.indexOf(fileType[1]) == -1 ){
            throw {message : "Please upload valid image type",status : 400};;
        }
        const filePath = path.join(__dirname,"uploads", reqBody.file.filename);
        const fileParts = reqBody.file.filename.split(".");
        const thumbnailPath = path.join(__dirname,"uploads", `${fileParts[0]}_thumbs.${fileParts[1]}`);
        const previewPath = path.join(__dirname,"uploads", `${fileParts[0]}_preview.${fileParts[1]}`);
        sharp(filePath).resize({fit: sharp.fit.contain,
            width: 300}).toFile(thumbnailPath);
        sharp(filePath).resize({fit: sharp.fit.contain,
            width: 600}).toFile(previewPath);
        const uploadData = {
            name : reqBody.file.filename,
            path :filePath,
            type:fileType[1],
            images : [{width :300, path : thumbnailPath},{width : 600, path : previewPath}]
        }
        const response = await fileModel.insertImage(uploadData)
    }catch(err){
       throw err;
    }
    
}
async function getFiles(){
    try{
        const response = await fileModel.getAll();
        return response;
    }catch(err){
        throw err;
    }
}
async function getFileById(params){
    try{
        let response = '';
        const searchParams = {};
        searchParams._id = params.imageId
        if(params.width){
           response = await fileModel.getFile(params,1);
           return response.images.length > 0 ? response.images[0].path : null
        }else{
            response = await fileModel.getFile(searchParams);
            return response ? response.images : [];
        }

    }catch(err){
        throw err;
    }
}
module.exports ={
    saveFile,
    getFiles,
    getFileById
}