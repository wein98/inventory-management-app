import { NestFactory } from '@nestjs/core';
import { InventoryApiModule } from './api/inventory/inventory.api.module';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const configMobile = new DocumentBuilder()
  .setTitle('Aujewel Inventory Management Api')
  .setDescription('Smart Inventory Management Api')
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const documentInventory = SwaggerModule.createDocument(app, configMobile, { include: [InventoryApiModule]});
  SwaggerModule.setup('api/inventory', app, documentInventory);

  await app.listen(3000);
}
bootstrap();
