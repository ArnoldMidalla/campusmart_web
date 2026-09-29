import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { InstitutionsController } from "./institutions.controller";
import { InstitutionsService } from "./institutions.service";

@Module({
    imports: [PrismaModule],
    providers: [InstitutionsService],
    controllers: [InstitutionsController],
    exports: [InstitutionsService],
})
export class InstitutionsModule { }