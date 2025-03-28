import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { JeuVideoService } from '../services/jeu-video.service';
import { CreateJeuVideoDto } from '../dto/create-jeu-video.dto';

@Controller('jeux-video')
export class JeuVideoController {
  constructor(private readonly jeuVideoService: JeuVideoService) {}

  @Post()
  create(@Body() createJeuVideoDto: CreateJeuVideoDto) {
    return this.jeuVideoService.create(createJeuVideoDto);
  }

  @Get()
  findAll() {
    return this.jeuVideoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jeuVideoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jeuVideoService.remove(+id);
  }
}