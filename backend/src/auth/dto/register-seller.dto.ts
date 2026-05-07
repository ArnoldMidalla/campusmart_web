import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class RegisterSellerDto {
  @ApiProperty({
    description: 'Email address for the new seller account',
    type: String,
    example: 'seller@example.com'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @ApiProperty({
    description: 'Password for the new seller account (min 8 characters)',
    type: String,
    example: 'strongpassword123'
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password!: string;

  @ApiProperty({
    description: 'First name of the seller',
    type: String,
    example: 'John'
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;

  @ApiProperty({
    description: 'Last name of the seller',
    type: String,
    example: 'Doe'
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;

  @ApiPropertyOptional({
    description: 'UUID of the institution the seller belongs to',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID('4', { message: 'institutionId must be a valid UUID' })
  @IsOptional()
  institutionId?: string;
}