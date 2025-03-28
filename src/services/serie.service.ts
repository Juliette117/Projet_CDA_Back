import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serie } from 'src/models/entities/serie.entity'; 
import { CreateSerieDto } from 'src/models/dto/create-serie.dto'; 

@Injectable()
export class SerieService {
  constructor(
    @InjectRepository(Serie)
    private serieRepository: Repository<Serie>,
  ) {}

  async create(createSerieDto: CreateSerieDto): Promise<Serie> {
    const serie = this.serieRepository.create(createSerieDto);
    return this.serieRepository.save(serie);
  }

  async findAll(): Promise<Serie[]> {
    return this.serieRepository.find();
  }

  async findOne(id: number): Promise<Serie> {
    return this.serieRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.serieRepository.delete(id);
  }
}