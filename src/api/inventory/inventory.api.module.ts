import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [ProductController],
  providers: [],
})
export class InventoryApiModule {}
