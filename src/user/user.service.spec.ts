import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

const mockedUerRepository = () => ({
  findByEmail: jest.fn(),
});

describe('UserService', () => {
  let service: UserService;
  let userRepository;
  let mockedUser;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: mockedUerRepository,
        },
      ],
    }).compile();
    service = module.get(UserService);
    userRepository = module.get(UserRepository);
    mockedUser = {
      name: 'test',
      email: 'test@test.com',
      address: 'nepal',
    };
  });

  //Nested describe to organise the test related(all) scenario of a function
  describe('findByEmail', () => {
    it('should return  user by email', async () => {
      userRepository.findByEmail.mockResolvedValue(mockedUser);
      const user = await service.getByEmail('Test@123.com');
      expect(user.name).toBe('test');
    });

    it('should throw error when email doesno exists', async () => {
      await userRepository.findByEmail.mockResolvedValue(null);
      await expect(service.getByEmail('test')).rejects.toThrow(
        'User with provided email not found',
      );
    });
  });
});
