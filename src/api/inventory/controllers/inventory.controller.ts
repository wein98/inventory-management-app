import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Request,
    Put,
    UploadedFile,
    UseInterceptors,
    UseGuards,
    Query,
    NotFoundException,
    Req,
  } from "@nestjs/common";
  import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariation } from "src/entity/product-variation.entity";
import { Product } from "src/entity/product.entity";
import { Repository } from "typeorm";
  
  @ApiTags("Inventory")
  @Controller("/api/inventory")
  export class InventoryController {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductVariation)
        private readonly productVariationRepository: Repository<ProductVariation>
    ) {}
  
    // GET stocks of distinct product variation by productId

    // GET total weight by productId

    // Decrease the stock count by product (variation) id 
    @Post(':id/decrease')
    async decreaseStock(@Param('id') id: number, @Body('amount') amount: number) {
        const productVariation = await this.productVariationRepository.findOne(id) 
        if (!productVariation) {
            throw new NotFoundException('Product variation not found')
        }
          
        // reduce the count by (amount) and save result
        productVariation.stockCount -= amount;

        // update updatedAt to current time 
        // productVariation.updatedAt = new Date();
        return this.productVariationRepository.save(productVariation)

    }

  }