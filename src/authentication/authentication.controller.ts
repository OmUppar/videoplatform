import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { InitializeAccountDto } from './dto/initialize-account.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ConfirmLoginDto } from './dto/confirm-login.dto';
import { JwtAuthGuard } from 'src/utils/gaurds/jwt-auth.guard';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly service: AuthenticationService) {}

  @Post('initialize-account')
  async initialize(@Body() dto: InitializeAccountDto) {
    return this.service.initializeAccount(dto);
  }

  @Post('verify-otp')
  async verify(@Body() dto: VerifyOtpDto) {
    return this.service.verifyOtp(dto);
  }

  @Post('confirm-login')
  async confirm(@Body() dto: ConfirmLoginDto) {
    return this.service.confirmLogin(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
}
