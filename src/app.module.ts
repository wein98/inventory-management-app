import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api';
import { ProductVariationJoinProduct } from './entity/subscribers/product-variation.subscriber';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from './config';
import { Product, ProductVariation, Purchase, User } from './entity';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: [ Product, ProductVariation, Purchase, User ],
    subscribers: [ ProductVariationJoinProduct ],
    synchronize: true,
  }),
  ApiModule]
})
export class AppModule {}
