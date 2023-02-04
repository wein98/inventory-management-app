import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class Login {
    @IsNotEmpty()
    @ApiProperty({default: 'test@test.com'})
    username: string;

    @IsNotEmpty()
    @ApiProperty()
    password: string;
}