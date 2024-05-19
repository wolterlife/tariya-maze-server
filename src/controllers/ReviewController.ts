import {Request, Response} from "express";
import {AppDataSource} from '../../db';
import {Review} from '../models/Review';

exports.getReview = async function (req: Request, res: Response) {
  const review = await AppDataSource
    .getRepository(Review)
    .createQueryBuilder("review")
    .getMany()
  res.json(review);
}

exports.createReview = async function (req: Request, res: Response) {
  const review = new Review();
  review.user = req.body.price
  review.stars = req.body.stars
  review.text = req.body.text
  res.json(await AppDataSource.getRepository(Review).save(review))
}
