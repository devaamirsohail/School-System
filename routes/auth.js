const express = require("express");
const router = express.Router();

//import controller
const { test, register } = require("../controllers/auth");

router.get("/test", test);
router.post("/register", register);

module.exports = router;
