import {Request, Response} from 'express';
import {AppDataSource} from '../../db';
import {Reservation} from '../models/Reservation';

exports.getReservations = async function (req: Request, res: Response) {
  const reservation = await AppDataSource
    .getRepository(Reservation)
    .createQueryBuilder("reservation")
    .leftJoinAndSelect("reservation.user", "user")
    .getMany()
  res.json(reservation);
}

exports.getReservationsByUserId = async function (req: Request, res: Response) {
  const reservation = await AppDataSource
    .getRepository(Reservation)
    .createQueryBuilder("reservation")
    .leftJoinAndSelect("reservation.user", "user")
    .where("reservation.user.id = :id", {id: req.params.id})
    .getMany()
  res.json(reservation);
}


exports.createReservation = async function (req: Request, res: Response) {
  const reservation = new Reservation();
  reservation.date = req.body.date
  reservation.time = req.body.time
  reservation.count = req.body.count
  reservation.isActive = true;
  reservation.user = req.body.user
  res.json(await AppDataSource.getRepository(Reservation).save(reservation))
}

exports.deleteReservation = async function (req: Request, res: Response) {
  const reservation = await AppDataSource
    .getRepository(Reservation)
    .createQueryBuilder("reservation")
    .where("reservation.id = :id", {id: req.params.id})
    .getOne()
  if (reservation) {
    await AppDataSource.getRepository(Reservation).delete(reservation)
    res.json(reservation)
  } else res.status(404).json({msg: "Бронь не найдена"});
}



