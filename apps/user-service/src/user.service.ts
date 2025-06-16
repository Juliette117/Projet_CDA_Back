import { CreateUserDto } from '@app/shared/dto/create-user.dto';
import { UpdateUserDto } from '@app/shared/dto/update-user.dto';
import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // 👤 Créer un nouvel utilisateur
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, ...rest } = createUserDto;

    // 🔎 Vérifie si un utilisateur avec le même email existe
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      this.logger.error(`Erreur lors de l’inscription : L'adresse email ${email} est déjà utilisé`);
      throw new ConflictException('Cet email est déjà utilisé.');
    }

    // 🔐 Hash du mot de passe
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      
    });
    this.logger.warn('mot de passe hashé :', hashedPassword);
    this.logger.warn('mot de passe dto :', createUserDto.password);

    this.logger.log(`✅ Utilisateur créé : ${email}`);
    return this.userRepository.save(user);
  }

  // 📄 Récupérer tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 🔍 Récupérer un utilisateur par son ID
  async findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 🔍 Récupérer un utilisateur par son email
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // ✏️ Mettre à jour un utilisateur
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({ id, ...updateUserDto });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);
    }
    return this.userRepository.save(user);
  }

  // ❌ Supprimer un utilisateur
  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);
    }
    await this.userRepository.remove(user);
  }
}