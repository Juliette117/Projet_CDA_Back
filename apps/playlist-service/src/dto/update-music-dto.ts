import { PartialType } from '@nestjs/mapped-types';
import { AddMusicDto } from './add-music.dto';

export class UpdateMusicDto extends PartialType(AddMusicDto) {}
