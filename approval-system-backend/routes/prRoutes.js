const express = require("express");

const router = express.Router();

const { createPR, getPRList } = require("../controllers/prController");

router.post("/pr", createPR);

router.get("/pr", getPRList);

module.exports = router;