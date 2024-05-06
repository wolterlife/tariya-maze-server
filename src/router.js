require ("reflect-metadata")
const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
  res.json("home");
});

module.exports = router;
