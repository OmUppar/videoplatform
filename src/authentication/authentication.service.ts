import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dataSource } from 'src/main';
import { Users } from './entities/user.entity';
import { Otp } from './entities/otp.entity';
import { InitializeAccountDto } from './dto/initialize-account.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ConfirmLoginDto } from './dto/confirm-login.dto';

@Injectable()
export class AuthenticationService {
  private userRepo = dataSource.getRepository(Users);
  private otpRepo = dataSource.getRepository(Otp);

  constructor(private readonly jwtService: JwtService) {}

  // 🔐 Generate 6-digit OTP
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 1️⃣ Send OTP
  async initializeAccount(dto: InitializeAccountDto) {
    const otp = this.generateOtp();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Optional: delete old OTPs
    await this.otpRepo.delete({ email: dto.email });

    await this.otpRepo.save({
      email: dto.email,
      otp,
      expiresAt,
      createdBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      updatedBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    });

    // TODO: send via email / SMS
    console.log('OTP:', otp);

    return {
      message: 'OTP sent successfully',
    };
  }

  // 2️⃣ Verify OTP
  async verifyOtp(dto: VerifyOtpDto) {
    const record = await this.otpRepo.findOne({
      where: {
        email: dto.email,
        otp: dto.otp,
      },
    });

    if (!record) {
      throw new BadRequestException('Invalid OTP');
    }

    if (record.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    // ✅ OTP verified → delete it (one-time use)
    await this.otpRepo.delete({ id: record.id });

    return {
      message: 'OTP verified successfully',
    };
  }

  // 3️⃣ Login & JWT
  async confirmLogin(dto: ConfirmLoginDto) {
    let user = await this.userRepo.findOne({
      where: { email: dto.email },
    });

    if (!user) {
      user = await this.userRepo.save({
        email: dto.email,
        isActive: true,
        createdBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        updatedBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      });
    }

    const payload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user,
    };
  }
}
