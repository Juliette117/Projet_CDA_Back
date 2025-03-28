import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from 'src/models/entities/film.entity'; 
import { CreateFilmDto } from 'src/models/dto/create-film.dto'; 

@Injectable()
export class FilmService {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(film);
  }

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOne(id: number): Promise<Film> {
    return this.filmRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.filmRepository.delete(id);
  }
}