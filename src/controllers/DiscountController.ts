import {Request, Response} from 'express';
import {AppDataSource} from '../../db';
import {Discount} from '../models/Discount';

exports.getDiscounts = async function (req: Request, res: Response) {
  const discounts = await AppDataSource
    .getRepository(Discount)
    .createQueryBuilder("discount")
    .getMany()
  res.json(discounts);
}

exports.createDiscount = async function (req: Request, res: Response) {
  const discount = new Discount();
  discount.description = req.body.description
  discount.name = req.body.name
  res.json(await AppDataSource.getRepository(Discount).save(discount))
}

exports.deleteDiscount = async function (req: Request, res: Response) {
  const discount = await AppDataSource
    .getRepository(Discount)
    .createQueryBuilder("discount")
    .where("discount.id = :id", {id: req.params.id})
    .getOne()
  if (discount) {
    await AppDataSource.getRepository(Discount).delete(discount)
    res.json(discount)
  } else res.status(404).json({msg: "Скидка не найдена"});
}
