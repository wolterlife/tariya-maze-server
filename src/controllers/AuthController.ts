import {AppDataSource} from '../../db';
import {Request, Response} from 'express';
import {User} from '../models/User';
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const {secretKey} = require('../../config')

function emailIsValid (email: string) {
  return /\S+@\S+\.\S+/.test(email)
}

exports.login = async function (req: Request, res: Response) {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where(`${(emailIsValid(req.body.login)) ? 'user.mail' : 'user.phone'} = :login`, {login: req.body.login})
    .getOne();
  if (!user) return res.status(401).json({msg: `Пользователь ${req.body.login} не найден`})

  const isPassValid = bcrypt.compareSync(req.body.password, user.password);
    const token = jwt.sign({id: user.id, roles: user.roles}, secretKey, {expiresIn: "24h"})
    if (isPassValid) res.json({
      user: {
        id: user.id,
        firstName: user.firstName,
        secondName: user.secondName,
        patronymic: user.patronymic,
        phone: user.phone,
        address: user.destination,
        dateOfBirth: user.dateOfBirth,
        roles: user.roles,
        mail: user.mail,
      },
      token,
    })
    else return res.json({msg: "Неправильный пароль"})
}

exports.registration = async function (req: Request, res: Response) {
  const checkUniqueMail = await AppDataSource // Проверка на уникальность почты
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.mail = :mail", {mail: req.body.mail})
    .getOne()

  const checkUniquePhone = await AppDataSource // Проверка на уникальность почты
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.phone = :phone", {phone: req.body.phone})
    .getOne()


  if (checkUniqueMail || checkUniquePhone) {
    return res.status(400).json({msg: "Почта/номер телефона уже занят"})
  }

  const user = new User();
  user.firstName = req.body.firstName
  user.secondName = req.body.secondName
  user.patronymic = req.body.patronymic
  user.dateOfBirth = req.body.dateOfBirth
  user.phone = req.body.phone
  user.mail = req.body.mail
  user.destination = req.body.destination;
  user.roles = 'user';
  user.password = bcrypt.hashSync(req.body.password, 7);
  await AppDataSource.getRepository(User).save(user);
  const token = jwt.sign({id: user.id, roles: user.roles}, secretKey, {expiresIn: "24h"})
   res.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      patronymic: user.patronymic,
      phone: user.phone,
      address: user.destination,
      dateOfBirth: user.dateOfBirth,
      roles: user.roles,
      mail: user.mail,
    },
    token,
  })
}


exports.isAdminById = async function (req: Request, res: Response) {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", {id: req.params.id})
    .getOne();
  if (user && user.roles.includes('admin')) res.json(true);
  else res.json(false);
}

exports.updatePass = async function (req: Request, res: Response) {
  const user = await AppDataSource
    .getRepository(User)
    .createQueryBuilder("user")
    .where("user.id = :id", {id: req.params.id})
    .getOne()
  if (!user) {
    res.status(404).json({msg: "Указанный пользователь не найден"})
    return
  }

  const isPassValid = bcrypt.compareSync(req.body.password, user.password);
  if (isPassValid) {
    console.log(user, req.body.newPass)
    user.password = bcrypt.hashSync(req.body.newPass, 7)
    await AppDataSource.getRepository(User).save(user)
    res.status(200).json({msg: "Успешно"});
  } else res.status(401).json({msg: "Неправильный пароль"})
}

