require ("reflect-metadata")
const express = require("express");
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware')
const newsController = require("./controllers/NewsController");
const discountController = require("./controllers/DiscountController");
const userController = require("./controllers/UserController");
const reservationController = require("./controllers/ReservationController");
const orderController = require("./controllers/OrderController");
const orderMenuController = require("./controllers/OrderMenuController");
const menuController = require("./controllers/MenuController");
const reviewController = require("./controllers/ReviewController");
const authController = require("./controllers/AuthController");

router.get('/', async (req, res) => {
  res.json("home");
});

router.post('/login', authController.login)                 //  Авторизация
router.post('/registration', authController.registration)   //  Регистрация
router.get('/auth/:id', authController.isAdminById)         //  Является ли администратором

router.get('/news', newsController.getNews);                                             //  GET все Новости
router.post('/news', authMiddleware(["admin"]), newsController.createNews)       //  POST Новость
router.delete("/news/:id", authMiddleware(["admin"]), newsController.deleteNews) //  DELETE Новость по ID
router.put("/news/:id", authMiddleware(["admin"]), newsController.updateNews)    //  PUT Новость по ID

router.get('/discounts', discountController.getDiscounts);                                            //  GET все Скидки
router.post('/discounts', authMiddleware(["admin"]), discountController.createDiscount)       //  POST Скидку
router.delete("/discounts/:id", authMiddleware(["admin"]), discountController.deleteDiscount) //  DELETE Скидку по ID
router.put("/discounts/:id", authMiddleware(["admin"]), discountController.updateDiscount)    //  PUT Новость по ID

router.get('/users', authMiddleware(["admin"]), userController.getUsers);         //  GET все Пользователи
router.delete("/users/:id", authMiddleware(["admin"]), userController.deleteUser) //  DELETE Пользователя по ID

router.get('/reservations', authMiddleware(["admin"]), reservationController.getReservations);                     //  GET все Брони
router.get('/reservations/:id', authMiddleware(["user", "admin"]), reservationController.getReservationsByUserId); //  GET все Брони по ID User
router.post('/reservations', authMiddleware(["user", "admin"]), reservationController.createReservation)           //  POST Бронь
router.delete("/reservations/:id", authMiddleware(["admin"]), reservationController.deleteReservation)             //  DELETE Бронь по ID

router.get('/orders', authMiddleware(["admin"]), orderController.getOrders);                     //  GET все Заказы
router.get('/orders/:id', authMiddleware(["user", "admin"]), orderController.getOrdersByUserId); //  GET все Заказы по ID User
router.post('/orders', authMiddleware(["admin"]), orderController.createOrder)                   //  POST Заказ
router.delete("/orders/:id", authMiddleware(["admin"]), orderController.deleteOrder)             //  DELETE Заказ по ID

router.get('/orders_menu', orderMenuController.getOrderMenu);                                             //  GET все Элементы заказа
router.post('/orders_menu', orderMenuController.createOrderMenu)                                          //  POST Элемент заказа
router.delete("/orders_menu/:id", authMiddleware(["admin"]), orderMenuController.deleteOrderMenu) //  DELETE Элемент заказа

router.get('/reviews', reviewController.getReview);                                      //  GET все Отзывы
router.post('/reviews', authMiddleware(["user"]), reviewController.createReview) //  POST Отзыв

router.get('/menu', menuController.getMenu);                                             //  GET все Блюда
router.post('/menu', authMiddleware(["admin"]), menuController.createMenu)       //  POST Блюдо
router.delete("/menu/:id", authMiddleware(["admin"]), menuController.deleteMenu) //  DELETE Блюдо

module.exports = router;
