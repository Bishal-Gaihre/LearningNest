import {ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import{ IsEmail, IsNotEmpty, IsOptional , IsString, MinLength } from "class-validator";

export class SignupDto {
    @ApiProperty({ example: 'user@example.com', description: "User Unique Email address"})
    @IsNotEmpty()
    email!: string;
    
    @ApiProperty({ example: 'password123', description:'minimum 6 characters'})
    @IsString()
    @MinLength(6, {message:"password must be of 6 letters"})
    password!: string;

    @ApiPropertyOptional({ example: "Bishal Gaihre", description: 'user name it is optional'})
    @IsString()
    @IsOptional()
    name?: string    
}