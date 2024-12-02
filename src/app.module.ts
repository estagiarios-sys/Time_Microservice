import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuscaTimeModule } from './busca-time/busca-time.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
    type: 'oracle',
    host:'10.10.1.2',
    port: 1521,
    serviceName: 'S001ERP.public.pocvcn.oraclevcn.com',
    username: 'systextil',
    password: '3rp#_SYSTEXTIL2021',
    synchronize: false,
  }), BuscaTimeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}