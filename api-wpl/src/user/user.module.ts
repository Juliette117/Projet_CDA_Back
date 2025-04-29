import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.entity';
import { Playlist } from 'src/playlist/playlist.entity';
import { PlaylistController } from 'src/playlist/playlist.controller';
import { PlaylistModule } from 'src/playlist/playlist.module';
import { PlaylistService } from 'src/playlist/playlist.service';
import { Music } from 'src/playlist/music/music.entity';
import { MusicModule } from 'src/playlist/music/music.module';
import { MusicController } from 'src/playlist/music/music.controller';
import { MusicService } from 'src/playlist/music/music.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Playlist, Music]),
    RoleModule,
    PlaylistModule,
    MusicModule,
  ],
  controllers: [
    UserController,
    RoleController,
    PlaylistController,
    MusicController,
  ],
  providers: [UserService, RoleService, PlaylistService, MusicService],
  exports: [UserService],
})
export class UserModule {}
