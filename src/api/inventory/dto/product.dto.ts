import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePrductDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly product_code: string;
  
  @IsNotEmpty()
  @ApiProperty()
  readonly category: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly weight: number;

  @ApiProperty()
  readonly length: number;

  @IsNotEmpty()
  @ApiProperty()
  readonly SKU: string;
}