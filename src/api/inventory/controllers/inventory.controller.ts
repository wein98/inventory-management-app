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
    BadRequestException
  } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express"
import { InjectRepository } from "@nestjs/typeorm";
import { ProductVariation } from "src/entity/product-variation.entity";
import { Product } from "src/entity/product.entity";
import { Repository } from "typeorm";
  
var csv = require("csvtojson"); 

export const imageFileFilter = (req:any, file:any, callback:any) => {
  if (!file.originalname.match(/\.(csv)$/)) {
    return callback(new Error('Only csv files are allowed!'), false);
  }
  callback(null, true);
};

  @ApiTags("Inventory")
  @Controller("/api/inventory")
  export class InventoryController {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(ProductVariation)
        private readonly productVariationRepository: Repository<ProductVariation>
    ) {}


    // Get the uploaded CSV
    @Post('sales/import/')
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: "object",
        properties: {
          "file": {
              type: "file",
              format: "binary",
          }
        },
        required: ["file"]
      }
    })
    @ApiOkResponse({ type: Array<Object> })
    @UseInterceptors(
      FileInterceptor('file', {
        fileFilter: imageFileFilter,
      }),
    )
    async importFile(@Body() body, @UploadedFile() file: Express.Multer.File){
      try {
        if (!file) {
          throw new BadRequestException('invalid file provided, allowed *.csv single file');
        }
        // convert csv to json 
        let data = await csv()
          .fromString(file.buffer.toString())
          .then(jsonObj=>jsonObj);

        console.log(data)

        let viewItems = data.map ( sale => {
          console.log(sale.orderId)
          console.log(sale.orderAmount)
        })

        return data
        
      } catch(err){
        throw err;
      }

    }

  
    // GET stocks of distinct product variation by productId


    // GET total weight by productId

  }