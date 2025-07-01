import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
