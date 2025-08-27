// import { Test, TestingModule } from '@nestjs/testing';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';

// describe('UserController', () => {
//   let controller: UserController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserController],
//       providers: [UserService],
//     }).compile();

//     controller = module.get<UserController>(UserController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

// user.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let serviceMock: Partial<UserService>;

  beforeEach(async () => {
    serviceMock = {
      findAll: jest.fn().mockResolvedValue([{ id: 1, email: 'test@test.com' }]),
      findOne: jest.fn().mockResolvedValue({ id: 1, email: 'test@test.com' }),
      create: jest.fn().mockResolvedValue({ ok: true, statusCode: 201 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', async () => {
    expect(await controller.findAll()).toEqual([{ id: 1, email: 'test@test.com' }]);
  });

  it('should return one user', async () => {
    expect(await controller.findOne('1')).toEqual({ id: 1, email: 'test@test.com' });
  });
});
