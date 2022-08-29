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
import { Purchase } from "src/entity";
import { Repository } from "typeorm";
  
  @ApiTags("Purchase")
  @Controller("/api/purchase")
  export class PurchaseController {
    constructor(
        @InjectRepository(Purchase)
        private readonly productRepository: Repository<Purchase>,
    ) {}
  
    // GET all purchases

    // GET all products by purchaseId

    // POST new purchase with date
  }