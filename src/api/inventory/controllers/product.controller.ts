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
  BadRequestException,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { InjectRepository } from "@nestjs/typeorm";
import { Product, ProductVariation } from "src/entity";
import { Pagination } from "src/util/apiPaginatedDto";
import { Like, Repository } from "typeorm";
import { CreateProductDto, CreateProductVariationDto, ProductDto } from "../dto/product.dto";
var csv = require("csvtojson");

export const imageFileFilter = (req:any, file:any, callback:any) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new Error('Only csv files are allowed!'), false);
  }
  callback(null, true);
};

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
  @ApiQuery({ name: 'limit', type: 'number', required: false, description: 'default 100'})
  @ApiQuery({ name: 'offset', type: 'number', required: false, description: 'default 0'})
  async getProductVariationsByProductId(
    @Query('limit') limit : number = 100, 
    @Query('offset') offset: number = 0, 
    @Param("productSKU") productSKU: string) : Promise<Pagination<any>> {
    console.log(productSKU);
    const where = {}
    where["SKU"] = Like(`%${productSKU}%`)
    const [ data, total ] = await this.productVariationRepository.findAndCount({
      where,
      relations: ['parent'],
      order: { SKU: 1 },
      take: limit,
      skip: offset
    });

    const pagination : Pagination<any> = {
      data, total
  }
    return pagination;
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

  @Post('products/import')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        "uploadFile": {
            type: "file",
            format: "binary",
        }
      },
      required: ["uploadFile"]
    }
  })
  @ApiOkResponse({ type: Array<Object> })
  @UseInterceptors(
    FileInterceptor('uploadFile', {
      fileFilter: imageFileFilter,
    }),
  )
  async importFile(@Body() body, @UploadedFile() uploadFile: Express.Multer.File) { 
    try {
      if (!uploadFile) {
        throw new BadRequestException('invalid file provided, allowed *.csv single file');
    }
      return await csv()
        .fromString(uploadFile.buffer.toString())
        .then(jsonObj=>jsonObj)
    } catch(err) {
      throw err;
    }
  }

  // TODO: save products to db
  // @Post('products/upload')
  // async postProducts(@Body() body: Array<Object>) {
  //   // loop through the csv file
  //   // check parent is null and type 
  //   if(!body){
  //     return { message: "Incorrect input."}
  //   }

  //   body.map(async productObj => {
  //     // 1. get parent productId
  //     const product = await this.productVariationRepository.save({
  //       weight: productObj.weight,
  //       length: productObj.length,
  //       size: productObj.size,
  //       product_code: productObj.product_code,
  //       size: productObj.size,
  //       size: productObj.size,
  //     });

  //     // 2. save product variation with productId relation
  //   })

  // }
}

  // https://blog.minhazav.dev/QR-and-barcode-scanner-using-html-and-javascript/