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

@ApiTags("User")
@Controller("/api/product")
export class ProductController{
  constructor() {}
}