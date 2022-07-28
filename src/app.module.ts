import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    // host: DB_HOST,
    host: "localhost",
    port: 3306,
    // username: DB_USERNAME,
    username: "root",
    // password: DB_PASSWORD,
    password: "password123",
    // database: DB_NAME,
    database: "inventory-mangement",
    entities: [],
    subscribers: [],
    synchronize: true,
  }),
  ApiModule]
})
export class AppModule {}
