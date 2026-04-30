import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
});

@Injectable()
export class PrismaService  implements OnModuleInit, OnModuleDestroy {
    private readonly client: PrismaClient;
    constructor() {
        const adapter = new PrismaPg(pool);
        this.client = new PrismaClient({ adapter });
    }

    get user() { return this.client.user}
    get listing() { return this.client.listing; }
    get listingImage() { return this.client.listingImage; }
    get order() { return this.client.order; }
    get orderItem() { return this.client.orderItem; }
    get payment() { return this.client.payment; }
    get review() { return this.client.review; }
    get wishlist() { return this.client.wishlist; }
    get institution() { return this.client.institution; }
    get verificationRequest() { return this.client.verificationRequest; }
    get moderationAction() { return this.client.moderationAction; }
    
    async onModuleInit() {
        await this.client.$connect();
    }

    async onModuleDestroy() {
        await this.client.$disconnect();
    }
}