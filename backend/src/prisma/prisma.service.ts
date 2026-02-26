import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client';

const adapter = new PrismaNeon({
  url: 'file:./prisma/dev.db',
});

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor() {
    super({adapter});
  }
  async onModuleInit() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    await this.$connect();
  }
}