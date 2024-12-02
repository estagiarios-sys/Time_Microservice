import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as oracledb from 'oracledb';

async function bootstrap() {

  try {
    oracledb.initOracleClient({ libDir: 'C:\\Systextil\\Programas\\Oracle\\instantclient_19_25'}); // Ajuste o caminho conforme necessário
  } catch (err) {
    console.error('Não foi possível inicializar o cliente Oracle:', err);
    process.exit(1);
  }

  

  const app = await NestFactory.create(AppModule, { cors: { origin: 'http://localhost:3000' } });
  
  await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
