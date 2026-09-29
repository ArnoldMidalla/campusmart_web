import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateInstitutionDto {
    @ApiProperty({
        description: 'Name of the institution',
        example: 'University of Example',
    })
    @IsString({ message: 'Name must be a string' })
    name!: string;
    
    @ApiProperty({
        description: 'Domain of the institution',
        example: 'example.edu',
    })
    @IsString({ message: 'Domain must be a string' })
    domain!: string;
}