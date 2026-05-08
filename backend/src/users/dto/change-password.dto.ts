import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
    @ApiProperty({
        description: 'Current password of the user',
        type: String,
        example: 'CurrentPass123'
    })
    currentPassword!: string;
    
    @ApiProperty({
        description: 'New password for the user account',
        type: String,
        example: 'NewStrongPass456'
    })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0
    }, { message: 'New password must be strong (at least 8 characters, including uppercase, lowercase, number, and symbol)' })
    newPassword!: string;
}