require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const newsController = require("./controllers/NewsController");
const discountController = require("./controllers/DiscountController");
const userController = require("./controllers/UserController");
const reservationController = require("./controllers/ReservationController");
const orderController = require("./controllers/OrderController");
const orderMenuController = require("./controllers/OrderMenuController");
const menuController = require("./controllers/MenuController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.get('/news', newsController.getNews);          //  GET все Новости
router.post('/news', newsController.createNews)       //  POST Новость
router.delete("/news/:id", newsController.deleteNews) //  DELETE Новость по ID
router.put("/news/:id", newsController.updateNews) //  PUT Новость по ID

router.get('/discounts', discountController.getDiscounts);         //  GET все Скидки
router.post('/discounts', discountController.createDiscount)       //  POST Скидку
router.delete("/discounts/:id", discountController.deleteDiscount) //  DELETE Скидку по ID

router.get('/users', userController.getUsers);         //  GET все Пользователи
router.post('/users', userController.createUser)       //  POST Пользователя
router.delete("/users/:id", userController.deleteUser) //  DELETE Пользователя по ID

router.get('/reservations', reservationController.getReservations );        //  GET все Брони
router.post('/reservations', reservationController.createReservation)       //  POST Бронь
router.delete("/reservations/:id", reservationController.deleteReservation) //  DELETE Бронь по ID

router.get('/orders', orderController.getOrders);         //  GET все Заказы
router.post('/orders', orderController.createOrder)       //  POST Заказ
router.delete("/orders/:id", orderController.deleteOrder) //  DELETE Заказ по ID

router.get('/orders_menu', orderMenuController.getOrderMenu);          //  GET все Элементы заказа
router.post('/orders_menu', orderMenuController.createOrderMenu)       //  POST Элемент заказа
router.delete("/orders_menu/:id", orderMenuController.deleteOrderMenu) //  DELETE Элемент заказа

router.get('/menu', menuController.getMenu);          //  GET все Блюда
router.post('/menu', menuController.createMenu)       //  POST Блюдо
router.delete("/menu/:id", menuController.deleteMenu) //  DELETE Блюдо

module.exports = router;
