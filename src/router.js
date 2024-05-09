require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const newsController = require("./controllers/newsController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/news', newsController.getNews);             //  GET все Новости
router.post('/news', newsController.createNews)        //  POST Новость
router.delete("/news/:id", newsController.deleteNews) // DELETE билет по ID



module.exports = router;
