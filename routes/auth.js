const express = require("express");
const router = express.Router();

//import controller
const { test } = require("../controllers/auth");

router.get("/test", test);

module.exports = router;
