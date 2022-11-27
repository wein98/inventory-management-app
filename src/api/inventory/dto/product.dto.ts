import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { PRODUCT_CATEGORY } from "src/entity/product.entity";

export class ProductDto {
  readonly id: string;
  readonly name: string;
  readonly product_code: string;
  readonly category: string;
  readonly workmanship: number;
  readonly SKU: string;
}

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;
  
  @IsNotEmpty()
  @ApiProperty()
  readonly product_code: number;
  
  @IsNotEmpty()
  @ApiProperty({ enum: PRODUCT_CATEGORY })
  readonly category: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly workmanship: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly SKU: string;
}

export class CreateProductVariationDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly weight: number;

  @ApiProperty()
  readonly length: number;
  
  @IsNotEmpty()
  @ApiProperty()
  readonly parentProductId: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly purchaseDate: Date;

  @IsNotEmpty()
  @ApiProperty()
  readonly productCode: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly SKU: string;
}