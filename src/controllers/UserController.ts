import {Request, Response} from 'express';
import {AppDataSource} from '../../db';
import {News} from '../models/News';
import {User} from '../models/User';

exports.getUsers = async function (req: Request, res: Response) {
  const users = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("users")
    .getMany()
  res.json(users);
}

exports.createUser = async function (req: Request, res: Response) {
  const user = new User();
  user.firstName = req.body.firstName
  user.secondName = req.body.secondName
  user.patronymic = req.body.patronymic
  user.password = req.body.password
  user.dateOfBirth = req.body.dateOfBirth
  user.phone = req.body.phone
  user.roles = 'user';
  res.json(await AppDataSource.getRepository(User).save(user))
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
