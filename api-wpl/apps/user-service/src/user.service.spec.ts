import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '@wpl/shared/entities/user.entity';


describe('UsersService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createSpy = jest
      .spyOn(repository, 'create')
      .mockReturnValue({} as any);
    const saveSpy = jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ id: 1 } as any);

    // const user = await service.create(
    //   'email@example.com',
    //   'username',
    //   'password',
    //   'role'
    // );
    expect(createSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalled();
    // expect(user).toEqual({ id: 1 });
  });
});
