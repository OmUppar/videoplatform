// import { Test, TestingModule } from '@nestjs/testing';
// import { UserService } from './user.service';

// describe('UserService', () => {
//   let service: UserService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UserService],
//     }).compile();

//     service = module.get<UserService>(UserService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });

// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DataSource, QueryRunner, EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let dataSourceMock: Partial<DataSource>;
  let queryRunnerMock: Partial<QueryRunner>;
  let managerMock: Partial<EntityManager>;

  beforeEach(async () => {
    // Mock manager
    managerMock = {
      find: jest.fn().mockResolvedValue([{ id: 1, email: 'test@test.com' }]),
      findOne: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
      save: jest.fn().mockResolvedValue({ id: 1, email: 'saved@test.com' }),
    };

    // Mock query runner
    queryRunnerMock = {
      manager: managerMock as EntityManager,
      connect: jest.fn(),
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
    };

    // Mock datasource
    dataSourceMock = {
      createQueryRunner: jest.fn().mockReturnValue(queryRunnerMock),
      manager: managerMock as EntityManager,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DataSource,
          useValue: dataSourceMock,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await service.findAll();
      expect(result).toEqual([{ id: 1, email: 'test@test.com' }]);
      expect(managerMock.find).toHaveBeenCalledWith(User);
    });
  });

  describe('findOne', () => {
    it('should return one user', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual({ id: 1, email: 'test@test.com' });
      expect(managerMock.findOne).toHaveBeenCalledWith(User, { where: { id: 1 } });
    });
  });

  describe('create', () => {
    it('should save a user', async () => {
      const userDto = { email: 'saved@test.com',password:'123',plan:'123' } as User;
      const result = await service.create(userDto);
      expect(result).toEqual({ id: 1, email: 'saved@test.com' });
      expect(managerMock.save).toHaveBeenCalledWith(User, userDto);
    });
  });

});


