import "reflect-metadata"
import {AppDataSource} from './db';
const {port} = require('./config')
const express = require('express');
const router = require('./src/router')
const cors = require("cors")
const app = express();

app.use(express.json());
app.use(cors())

app.use("/", router)

AppDataSource.initialize() // init db
  .then(() => {
    console.log('DataBase is connected!');
  })
  .catch((error) => console.log(error));

app.listen(port, () => {console.log(`App listen on port ${port}!`)})

// TODO: Где связь с юзером сделать проверку, иначе происходят краши
// TODO: Проверить роли 'admin user' на фронте, но скорее ввсего всё нормально

