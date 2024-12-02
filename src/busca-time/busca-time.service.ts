import { Injectable, BadRequestException } from '@nestjs/common';
import * as oracledb from 'oracledb';

@Injectable()
export class BuscaTimeService {

  private FormaTime(timeInSeconds: number): string {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  }


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

      let executionPlan = null;

      if(result.rows && result.rows.length > 0){
        const FirstRowTime = result.rows[0][0];
        if(FirstRowTime){
          executionPlan = this.FormaTime(FirstRowTime);
        }
      }

      await connection.execute('DELETE FROM plan_table');
      await connection.commit();

      return { executionPlan };

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