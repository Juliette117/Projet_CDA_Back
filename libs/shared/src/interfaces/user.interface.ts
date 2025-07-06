import { Role } from '../enums/role.enum';

export interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  likedMediaIds: string[];
  likedPlaylistIds: string[];
  role: Role;
}
