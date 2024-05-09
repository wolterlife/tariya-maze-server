import {Request, Response} from "express";
import {AppDataSource} from '../../db';
import {News} from '../models/News';

exports.getNews = async function (req: Request, res: Response) {
  const news = await AppDataSource
    .getRepository(News)
    .createQueryBuilder("news")
    .getMany()
  res.json(news);
}

exports.createNews = async function (req: Request, res: Response) {
  const news = new News();
  news.description = req.body.description
  news.title1 = req.body.title1
  news.title2 = req.body.title2
  res.json(await AppDataSource.getRepository(News).save(news))
}

exports.deleteNews = async function (req: Request, res: Response) {
  const news = await AppDataSource
    .getRepository(News)
    .createQueryBuilder("news")
    .where("news.id = :id", {id: req.params.id})
    .getOne()
  if (news) {
    await AppDataSource.getRepository(News).delete(news)
    res.json(news)
  } else res.status(404).json({msg: "Новость не найдена"});
}
