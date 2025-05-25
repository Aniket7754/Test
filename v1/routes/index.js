const router = require("express").Router();
const FileUploadRoutes = require("./test");



router.use("/test", FileUploadRoutes);






module.exports = router;

