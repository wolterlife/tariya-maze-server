import {Request, Response} from 'express';
import {AppDataSource} from '../../db';
import {User} from '../models/User';

exports.getUsers = async function (req: Request, res: Response) {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("users")
    .getMany()
  res.json(users);
}

exports.deleteUser = async function (req: Request, res: Response) {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", {id: req.params.id})
    .getOne()
  if (user) {
    await AppDataSource.getRepository(User).delete(user)
    res.json(user)
  } else res.status(404).json({msg: "Пользователь не найден"});
}
