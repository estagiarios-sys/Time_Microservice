import { Body, Controller, Post } from '@nestjs/common';
import { BuscaTimeService } from './busca-time.service';

@Controller('busca-time')
export class BuscaTimeController {
  constructor(private readonly buscaTimeService: BuscaTimeService) {}

  @Post()
  async handlerQuery(@Body('query') query:string){
    return this.buscaTimeService.executeQueryWithTime(query);
  }
}
