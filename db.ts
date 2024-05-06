import {DataSource} from 'typeorm';

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "WOLTER\\SQLEXPRESS",
  port: 5432,
  username: "admin",
  password: "password",
  database: "tariya-maze",
  entities: [],
  synchronize: true,
  options: {
    trustServerCertificate: true,
  },
});
