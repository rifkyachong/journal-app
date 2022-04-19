const express = require("express");
const router = express.Router();
const authentication = require("../middleware/authentication");
const { test } = require("../controller/journals");

router.use(authentication);
router.route("/").post(test);

module.exports = router;
