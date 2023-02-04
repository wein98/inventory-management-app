import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './controllers/order.controller';
import { InventoryController } from './controllers/inventory.controller';
import { PurchaseController } from './controllers/purchase.controller';
import { Product, ProductVariation, Purchase, User } from 'src/entity';
import { AuthController } from './controllers/auth.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([
    Product,
    ProductVariation,
    Purchase,
    User
  ]), AuthModule],
  controllers: [
    ProductController, 
    OrderController,
    InventoryController,
    PurchaseController,
    AuthController
  ]
})
export class InventoryApiModule {}
