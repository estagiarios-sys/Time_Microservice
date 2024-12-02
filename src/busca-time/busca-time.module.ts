import { Module } from '@nestjs/common';
import { BuscaTimeService } from './busca-time.service';
import { BuscaTimeController } from './busca-time.controller';



@Module({
  controllers: [BuscaTimeController],
  providers: [BuscaTimeService],
})
export class BuscaTimeModule {}
