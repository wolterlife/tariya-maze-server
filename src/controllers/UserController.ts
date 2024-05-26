import {Request, Response} from 'express';
import {AppDataSource} from '../../db';
import {User} from '../models/User';
import {Not} from 'typeorm';

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

exports.updateUser = async function (req: Request, res: Response) {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", {id: req.params.id})
    .getOne()
  if (!user) {
    res.status(404).json({msg: "Указанный пользователь не найден"})
    return
  }

  const checkUniqueMail = await AppDataSource // Проверка на уникальность почты
    .getRepository(User)
    .count({
      where: {
        id: Not(+req.params.id),
        mail: req.body.mail
      }
    })

  const checkUniquePhone = await AppDataSource // Проверка на уникальность телефона
    .getRepository(User)
    .count({
      where: {
        id: Not(+req.params.id),
        phone: req.body.phone
      }
    })

  if (checkUniqueMail || checkUniquePhone) {
    return res.status(400).json({msg: "Почта/номер телефона уже занят"})
  }

  AppDataSource.getRepository(User).merge(user, req.body)
  res.json(await AppDataSource.getRepository(User).save(user));
}
