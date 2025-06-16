import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommandationServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
