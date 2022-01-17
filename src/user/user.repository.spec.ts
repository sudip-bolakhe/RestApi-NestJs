import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.model';
import { UserRepository } from './user.repository';

const mockedUserModel = () => ({
  findOne: jest.fn(),
});

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let userModel;
  let mockedUser;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useFactory: mockedUserModel,
        },
      ],
    }).compile();
    userRepository = testModule.get(UserRepository);
    userModel = testModule.get(getModelToken(User.name));
    mockedUser = {
      name: 'test',
      email: 'test@test.com',
      address: 'nepal',
    };
  });

  describe('findByEmail ', () => {
    it('is defined', async () => {
      expect(userRepository.findByEmail).toBeDefined();
    });

    it('returns single value', async () => {
      userModel.findOne.mockResolvedValue(mockedUser);
      const returnedValue = await userRepository.findByEmail('test@test.com');
      expect(returnedValue.name).toBe('test');
    });

    it('returns no value', async () => {
      userModel.findOne.mockResolvedValue(null);
      const returnedValue = await userRepository.findByEmail('test@test.com');
      expect(returnedValue).toBeNull;
    });
  });
});
