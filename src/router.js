require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const newsController = require("./controllers/NewsController");
const discountController = require("./controllers/DiscountController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/news', newsController.getNews);          //  GET все Новости
router.post('/news', newsController.createNews)       //  POST Новость
router.delete("/news/:id", newsController.deleteNews) //  DELETE Новость по ID

router.get('/discounts', discountController.getDiscounts );          //  GET все Новости
router.post('/discounts', discountController.createDiscount)       //  POST Новость
router.delete("/discounts/:id", discountController.deleteDiscount) //  DELETE Новость по ID



module.exports = router;
