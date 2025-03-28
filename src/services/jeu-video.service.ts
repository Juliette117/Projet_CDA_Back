import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JeuVideo } from 'src/models/entities/jeu-video.entity'; 
import { CreateJeuVideoDto } from 'src/models/dto/create-jeu-video.dto'; 

@Injectable()
export class JeuVideoService {
  constructor(
    @InjectRepository(JeuVideo)
    private jeuVideoRepository: Repository<JeuVideo>,
  ) {}

  async create(createJeuVideoDto: CreateJeuVideoDto): Promise<JeuVideo> {
    const jeuVideo = this.jeuVideoRepository.create(createJeuVideoDto);
    return this.jeuVideoRepository.save(jeuVideo);
  }

  async findAll(): Promise<JeuVideo[]> {
    return this.jeuVideoRepository.find();
  }

  async findOne(id: number): Promise<JeuVideo> {
    return this.jeuVideoRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.jeuVideoRepository.delete(id);
  }
}