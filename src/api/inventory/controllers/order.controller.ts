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
  import { CreateProductDto, CreateProductVariationDto } from "../dto/product.dto";
  
  @ApiTags("Order")
  @Controller("/api/order")
  export class OrderController {
    constructor() {}
  
    // GET order by orderId

    // POST order
  }