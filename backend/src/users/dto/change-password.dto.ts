import { ApiProperty } from "@nestjs/swagger";
import { IsStrongPassword } from "class-validator";

export class ChangePasswordDto {
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
    }, { message: 'New password must be strong (at least 8 characters, including uppercase, lowercase and a number)' })
    newPassword!: string;
}