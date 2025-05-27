import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../libs/shared-lib/src/entities/user.entity';
import { RoleName } from '../../../libs/shared-lib/src/enums/role.enum';
import { Repository } from 'typeorm';



@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(data: {
  email: string;
  username: string;
  password: string;
  role?: RoleName;
}): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async findAll() {
    return this.userRepository.find({
      select: ['id', 'email', 'username'],
    });
  }

  async findById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'username'],
    });
  }
}
