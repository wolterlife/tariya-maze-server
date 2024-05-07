import {DataSource} from 'typeorm';
import {Discount} from './src/models/Discount';
import {News} from './src/models/News';

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "WOLTER\\SQLEXPRESS",
  port: 5432,
  username: "admin",
  password: "password",
  database: "tariya-maze",
  entities: [Discount, News],
  synchronize: true,
  options: {
    trustServerCertificate: true,
  }
});
