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
  ConflictException,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Product, ProductVariation } from "src/entity";
import { Pagination } from "src/util/apiPaginatedDto";
import { Repository } from "typeorm";
import { CreateProductDto, CreateProductVariationDto, ProductDto } from "../dto/product.dto";

@ApiTags("Product")
@Controller("/api/product")
export class ProductController {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductVariation)
    private readonly productVariationRepository: Repository<ProductVariation>
  ) {}
  

  @Get('variations/:productSKU')
  async getProductVariationsByProductId(@Param("productSKU") productSKU: string) {
    const productVariation = await this.productVariationRepository.findOne({SKU: productSKU});
    if(!productVariation){
      throw new NotFoundException();
    }
    return productVariation;
  }

  @Get('')
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'default 100'})
  @ApiQuery({ name: 'offset', type: 'number', required: false, description: 'default 0'})
  async getAllProducts(@Query('limit') limit : number = 100, @Query('offset') offset: number = 0) : Promise<Pagination<ProductDto>> {
    const [ data, total ] = await this.productRepository.findAndCount({
      order: { name: 1 },
      take: limit,
      skip: offset
    })
    const pagination : Pagination<ProductDto> = {
        data, total
    }
    return pagination;
  }

  @Get(':productSKU')
  async getProductByProductSKU(@Param("productSKU") SKU: string) {
    const product = await this.productRepository.findOne({SKU: SKU}, {relations: ['product_variations']});
    if(!product){
      throw new NotFoundException();
    }
    return product;
  }

  
  @Post('')
  @ApiOkResponse({ type: CreateProductDto })
  async postProduct(@Body() body: CreateProductDto) {
    try {
      return await this.productRepository.save(body as any);
      
    } catch (error) {
      switch(error.code) {
        case 'ER_DUP_ENTRY':
          throw new ConflictException('Product SKU or code already exists.');
        case 'WARN_DATA_TRUNCATED':
          throw new ConflictException('Invalid input.');
        default:
          throw new Error;
      }
    }
  }

  @Post('variation')
  async postProductVariation(@Body() body: CreateProductVariationDto) {
    const product = await this.productRepository.findOne({product_code: body.parentProductId});

    if (!product) {
      throw new NotFoundException();
    }

    try {
      return await this.productVariationRepository.save({
        weight: body.weight,
        length: body.length,
        SKU: body.SKU,
        product_code: body.productCode,
        purchase_date: body.purchaseDate,
        parent: product
      });
      
    } catch (error) {
      switch(error.code) {
        case 'ER_DUP_ENTRY':
          throw new ConflictException('Product SKU or code already exists.');
        case 'WARN_DATA_TRUNCATED':
          throw new ConflictException('Invalid input.');
        default:
          throw new Error;
      }
    }
  }

  // TODO: batch upload
  // https://stackoverflow.com/questions/71257348/how-do-i-read-an-uploaded-file-text-csv-using-nestjs-and-multer

  // https://blog.minhazav.dev/QR-and-barcode-scanner-using-html-and-javascript/
}