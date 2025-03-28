import { Module } from '@nestjs/common';
import { SerieService } from './serie.service';
import { SerieController } from './controllers/serie.controller';

@Module({
  providers: [SerieService],
  controllers: [SerieController]
})
export class SerieModule {}
