const express = require("express");
const router = express.Router();
const multer = require("multer")
const path = require("path")
const fileController = require("./file.controller")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const fileParts = file.originalname.split(".");
        cb(null, fileParts[0] + '_' + Date.now()+'.'+fileParts[1])
    },
})
const upload = multer({ storage:storage});
        
router.get("/",(req, res) =>{
    res.send("App is running");
})
router.post("/images",upload.single("image"),fileController.saveFile)
router.get("/images",fileController.getFiles)
router.get("/images/:imageId", fileController.getFileById)
router.get("/images/:imageId/:width", fileController.getFileById)

module.exports = router;