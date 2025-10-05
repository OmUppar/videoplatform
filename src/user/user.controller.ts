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

@Controller('v1/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(
    @Body() { email, password, plan },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // const decoded = await getPiedapAdminJWTDecoder(req);
    const result = await this.userService.create(
      // createDifficultyLevelDto,
      // decoded,
      { email, password, plan },
    );
    return res.status(result.statusCode).send(result);
  }
}
