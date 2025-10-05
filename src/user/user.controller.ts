import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('v1/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() createParams: CreateUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // const decoded = await getPiedapAdminJWTDecoder(req);
    const result = await this.userService.create(
      // createDifficultyLevelDto,
      // decoded,
      createParams,
    );
    return res.status(result.statusCode).send(result);
  }
}
