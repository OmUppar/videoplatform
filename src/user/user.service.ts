import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { dataSource } from 'src/main';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  // constructor(private readonly dataSource: DataSource) {}  // 👈 Injected FOr Jest Testing

  async create({ email, password, plan }: CreateUserDto) {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // const updatedAndCreatedBy = getUpdatedAndCreatedBy(decoded);

      // if (!updatedAndCreatedBy) {
      //   await queryRunner.rollbackTransaction();
      //   return E7x00;
      // }

      const createUser = new User();

      createUser.email = email;
      createUser.password = password;
      createUser.plan = plan;
      createUser.updatedBy = '687e39c5-b534-8006-b1b9-dafaa342b2de';
      createUser.createdBy = '687e39c5-b534-8006-b1b9-dafaa342b2de';

      await queryRunner.manager.save<User>(createUser);

      await queryRunner.commitTransaction();

      return {
        ok: true,
        error: false,
        warn: false,
        message: 'User Created Successfully',
        statusCode: 201,
        errorData: null,
        data: {},
        code: 201,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      // let message = SOMETHING_WENT_WRONG;
      // let code = SOMETHING_WENT_WRONG_CODE;
      // const errorData: any = {};

      // if (error && error.code === PG_UNIQUE_VIOLATION) {
      //   message = 'User already exists.';
      //   code = 'ALREADY_EXISTS';
      //   errorData.difficultyLevel = 'User already exists.';
      //   try {
      //     const checkDifficultyLevel = await checkIfDataExists(
      //       `${SCHEMA.PLATFORM}.difficulty_level`,
      //       ['difficultyLevel'],
      //       [difficultyLevel],
      //     );

      //     if (checkDifficultyLevel) {
      //       message = ' "Difficulty Level" already exists.';
      //       errorData.difficultyLevel = 'Difficulty Level already exists';
      //     }
      //   } catch (error) {}
      // }

      return {
        ok: false,
        error: true,
        warn: false,
        // errorData,
        statusCode: 500,
        code: 400,
        message: 'not working',
      };
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const result = await dataSource.manager
        .createQueryBuilder(User, 'u')
        // .leftJoinAndMapOne(
        //   'u.user_created',
        //   PiedapUser,
        //   'pu1',
        //   'u."createdBy" = pu1.id',
        // )
        // .leftJoinAndMapOne(
        //   'u.user_updated',
        //   PiedapUser,
        //   'pu2',
        //   'u."updatedBy" = pu2.id',
        // )
        // .orderBy('u."updatedOn"', 'DESC')
        .getMany();

      return result;
    } catch (error) {
      return [];
    }
  }
}
