require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const newsController = require("./controllers/NewsController");
const discountController = require("./controllers/DiscountController");
const userController = require("./controllers/UserController");
const reservationController = require("./controllers/ReservationController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/news', newsController.getNews);          //  GET все Новости
router.post('/news', newsController.createNews)       //  POST Новость
router.delete("/news/:id", newsController.deleteNews) //  DELETE Новость по ID

router.get('/discounts', discountController.getDiscounts );          //  GET все Скидки
router.post('/discounts', discountController.createDiscount)       //  POST Скидку
router.delete("/discounts/:id", discountController.deleteDiscount) //  DELETE Скидку по ID

router.get('/users', userController.getUsers );          //  GET все Пользователи
router.post('/users', userController.createUser)       //  POST Пользователя
router.delete("/users/:id", userController.deleteUser) //  DELETE Пользователя по ID

router.get('/reservations', reservationController.getReservations );          //  GET все Пользователи
router.post('/reservations', reservationController.createReservation)       //  POST Пользователя
router.delete("/reservations/:id", reservationController.deleteReservation) //  DELETE Пользователя по ID




module.exports = router;
