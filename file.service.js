const fileModel = require("./file.model")
const path = require('path')
const sharp = require("sharp");
async function saveFile(reqBody){
    try{
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
            type:reqBody.file.mimetype,
            images : [{width :300, path : thumbnailPath},{width : 600, path : previewPath}]
        }
        const response = await fileModel.insertImage(uploadData)
        return response;
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
           return response.images.length > 0 ? response.images[0] : null
        }else{
            response = await fileModel.getFile(searchParams);
            return response;
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