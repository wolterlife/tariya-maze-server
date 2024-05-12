import {Request, Response} from 'express';
import {AppDataSource} from '../../db';
import {OrderMenu} from '../models/OrderMenu';

exports.getOrderMenu = async function (req: Request, res: Response) {
  const orderMenu = await AppDataSource
    .getRepository(OrderMenu)
    .createQueryBuilder("order_menu")
    .leftJoinAndSelect("order_menu.order", "order")
    .leftJoinAndSelect("order_menu.item_id", "item_id")
    .getMany()
  res.json(orderMenu);
}

exports.createOrderMenu = async function (req: Request, res: Response) {
  const orderMenu = new OrderMenu();
  orderMenu.order = req.body.order
  orderMenu.item_id = req.body.item_id
  orderMenu.count = req.body.count
  res.json(await AppDataSource.getRepository(OrderMenu).save(orderMenu))
}

exports.deleteOrderMenu = async function (req: Request, res: Response) {
  const orderMenu = await AppDataSource
    .getRepository(OrderMenu)
    .createQueryBuilder("order_menu")
    .where("order_menu.id = :id", {id: req.params.id})
    .getOne()
  if (orderMenu) {
    await AppDataSource.getRepository(OrderMenu).delete(orderMenu)
    res.json(orderMenu)
  } else res.status(404).json({msg: "Элемент заказа не найден"});
}
