import {Request, Response} from "express";
import {AppDataSource} from '../../db';
import {Order} from '../models/Order';

exports.getOrders = async function (req: Request, res: Response) {
  const orders = await AppDataSource
    .getRepository(Order)
    .createQueryBuilder("orders")
    .leftJoinAndSelect("orders.user", "user")
    .getMany()
  res.json(orders);
}

exports.getOrdersByUserId = async function (req: Request, res: Response) {
  const orders = await AppDataSource
    .getRepository(Order)
    .createQueryBuilder("orders")
    .leftJoinAndSelect("orders.user", "user")
    .where("orders.user.id = :id", {id: req.params.id})
    .getMany()
  res.json(orders);
}

exports.createOrder = async function (req: Request, res: Response) {
  const order = new Order();
  order.price = req.body.price
  order.date = req.body.date
  order.dest = req.body.dest
  order.comment = req.body.comment
  order.user = req.body.user
  order.people = req.body.people
  order.paymentValue = req.body.paymentValue
  res.json(await AppDataSource.getRepository(Order).save(order))
}

exports.deleteOrder = async function (req: Request, res: Response) {
  const order = await AppDataSource
    .getRepository(Order)
    .createQueryBuilder("order")
    .where("order.id = :id", {id: req.params.id})
    .getOne()
  if (order) {
    await AppDataSource.getRepository(Order).delete(order)
    res.json(order)
  } else res.status(404).json({msg: "Заказ не найден"});
}
