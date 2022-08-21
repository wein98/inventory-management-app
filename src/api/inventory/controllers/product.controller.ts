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
import { CreatePrductDto } from "../dto/product.dto";

@ApiTags("Product")
@Controller("/api/product")
export class ProductController {
  constructor() {}

  @Post('/:productId')
  async getProductById(@Param("productId") productId: string) {

    console.log('ok');
  }

  @Post('')
  async postProduct(@Body() body: CreatePrductDto) {

    console.log('ok');
  }
}