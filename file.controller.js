const fileService = require("./file.service")
async function saveFile(req, res){
    try{
        const reqBody = req;
        fileService.saveFile(reqBody).then((result) => {
            res.json({status : 200, data : "Image uploaded successfully"})
        }).catch((err) => {
            res.json(err)
        })
    }catch(err){
        res.json({status : 400, message :"Error occured"})
    }
}
async function getFiles(req, res){
    try{
        fileService.getFiles().then((result) => {
            res.json({status : 200, data : result})
        }).catch((err) => {
            res.json(err)
        })
    }catch(err){
        res.json({status : 400, message :"Error occured"})
    }
}
async function getFileById(req, res){
    try{
        const queryParams = req.params;
        fileService.getFileById(queryParams).then((result) => {
            res.json({status : 200, data : result})
        }).catch((err) => {
            res.json(err)
        })
    }catch(err){
        res.json({status : 400, message :"Error occured"})
    }
}
module.exports={
    saveFile,
    getFiles,
    getFileById
}