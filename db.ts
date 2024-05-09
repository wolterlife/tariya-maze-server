import {DataSource} from 'typeorm';
import {Discount} from './src/models/Discount';
import {News} from './src/models/News';
import {Menu} from './src/models/Menu';
import {Order} from './src/models/Order';
import {Role} from './src/models/Role';
import {Reservation} from './src/models/Reservation';
import {User} from './src/models/User';
import {OrderMenu} from './src/models/OrderMenu';

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "WOLTER\\SQLEXPRESS",
  port: 5432,
  username: "admin",
  password: "password",
  database: "tariya-maze",
  entities: [Discount, Menu, News, Order, OrderMenu, Reservation, Role, User],
  synchronize: true,
  options: {
    trustServerCertificate: true,
  }
});
