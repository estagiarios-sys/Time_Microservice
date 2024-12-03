import { Injectable, BadRequestException } from '@nestjs/common';
import * as oracledb from 'oracledb';

@Injectable()
export class BuscaTimeService {

  // private FormaTime(timeInSeconds: number): number {
  //   const hours = Math.floor(timeInSeconds / 3600);
  //   const minutes = Math.floor((timeInSeconds % 3600) / 60);
  //   const seconds = timeInSeconds % 60;
    
  //   // if (hours === 0 && minutes === 0 && seconds === 1) {
  //   //   return `${seconds} segundo`;
  //   // }
  
  //   // const parts = [];
  
  //   // if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
  //   // if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "minuto" : "minutos"}`);
  //   // if (seconds > 0) parts.push(`${seconds} ${seconds === 1 ? "segundo" : "segundos"}`);
  
  //   return timeInSeconds;

  // }


  async executeQueryWithTime(query: string): Promise<any> {
    // Validação para garantir que apenas SELECT ou WITH são aceitos
    if (!/^(SELECT|WITH)\s/i.test(query.trim())) {
      throw new BadRequestException('Apenas consultas com SELECT ou WITH são permitidas');
    }

   
    let connection;
   
    try {
      connection = await oracledb.getConnection();

      query = query.replace(/;\s*$/, '');

      const explanPlanSql = `EXPLAIN PLAN FOR ${query}`
      await connection.execute(explanPlanSql);

      const planQuery = `SELECT time FROM plan_table`;
      const result = await connection.execute(planQuery);


      await connection.execute('DELETE FROM plan_table');
      await connection.commit();

      return parseInt(result.rows[0][0], 10);

    } catch(error){
      console.error('Erro ao processar a consulta', error);
      throw new BadRequestException(`Erro ao processar a consulta: ${error.message}`);
    }finally{
      if(connection){
        await connection.close();
      }
    }
  }
}