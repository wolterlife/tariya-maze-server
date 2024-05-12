import {Request, Response} from "express";
import {AppDataSource} from '../../db';
import {Menu} from '../models/Menu';

exports.getMenu = async function (req: Request, res: Response) {
  const menu = await AppDataSource
    .getRepository(Menu)
    .createQueryBuilder("menu")
    .getMany()
  res.json(menu);
}

exports.createMenu = async function (req: Request, res: Response) {
  const menu = new Menu();
  menu.price = req.body.price
  menu.name = req.body.name
  menu.val = req.body.val
  menu.description = req.body.description
  menu.imgLink = req.body.imgLink
  res.json(await AppDataSource.getRepository(Menu).save(menu))
}

exports.deleteMenu = async function (req: Request, res: Response) {
  const menu = await AppDataSource
    .getRepository(Menu)
    .createQueryBuilder("menu")
    .where("menu.id = :id", {id: req.params.id})
    .getOne()
  if (menu) {
    await AppDataSource.getRepository(Menu).delete(menu)
    res.json(menu)
  } else res.status(404).json({msg: "Блюдо не найдено"});
}
