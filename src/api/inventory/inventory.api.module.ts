import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { InventoryController } from './controllers/inventory.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { Product, ProductVariation, Purchase } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product,
    ProductVariation,
    Purchase
  ])],
  controllers: [
    ProductController, 
    OrderController,
    InventoryController,
    PurchaseController
  ],
  providers: [],
})
export class InventoryApiModule {}
