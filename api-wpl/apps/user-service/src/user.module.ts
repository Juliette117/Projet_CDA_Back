import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { PlaylistController } from '../../playlist-service/src/playlist.controller';
import { PlaylistModule } from '../../playlist-service/src/playlist.module';
import { PlaylistService } from '../../playlist-service/src/playlist.service';
import { MusicModule } from '../../playlist-service/src/music/music.module';
import { MusicController } from '../../playlist-service/src/music/music.controller';
import { MusicService } from '../../playlist-service/src/music/music.service';
import { Music } from '../../../libs/shared-lib/src/entities/music.entity';
import { Playlist } from '../../../libs/shared-lib/src/entities/playlist.entity';
import { Role } from '../../../libs/shared-lib/src/entities/role.entity';
import { User } from '../../../libs/shared-lib/src/entities/user.entity';



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
