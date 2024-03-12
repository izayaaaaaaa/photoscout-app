import { Module } from '@nestjs/common';
import { MarkersModule } from './markers/markers.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MarkersModule,
    PrismaModule,
  ],
})
export class AppModule {}
