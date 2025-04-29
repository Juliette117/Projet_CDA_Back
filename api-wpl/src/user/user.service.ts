import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, username: string, password: string) {
    const user = this.userRepository.create({ email, username, password });
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
