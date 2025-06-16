import { Module, Global } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';
import { Driver } from 'neo4j-driver';
import { createDriver } from './neo4j.utils';

@Global()
@Module({
  providers: [
    // {
    //   provide: 'NEO4J_DRIVER',
    //   useFactory: async () => createDriver(), // fonction qui crée un Driver
    // },
    // {
    //   provide: Driver,
    //   useExisting: 'NEO4J_DRIVER',
    // },
    Neo4jService
  ],
  exports: [Neo4jService],
})
export class Neo4jModule {}