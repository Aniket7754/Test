const router = require("express").Router();
require("dotenv").config();

const Controller = require("../controllers/test");



router.post("/signup",Controller.signup);
router.post("/login",Controller.login);

router.post("/calculate",Controller.calculate);




module.exports = router;
