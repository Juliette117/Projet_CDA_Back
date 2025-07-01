// neo4j.module.ts
import { Module, DynamicModule } from '@nestjs/common';
import { Neo4jService } from './neo4j.service';

@Module({})
export class Neo4jModule {
  static forRoot(config: {
    scheme: string;
    host: string;
    port: number;
    username: string;
    password: string;
  }): DynamicModule {
    return {
      module: Neo4jModule,
      providers: [
        {
          provide: 'NEO4J_CONFIG',
          useValue: config,
        },
        Neo4jService,
      ],
      exports: [Neo4jService],
    };
  }
}
