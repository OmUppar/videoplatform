import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { dataSource } from 'src/main';
import { Users } from './entities/user.entity';
import { Otp } from './entities/otp.entity';
import { InitializeAccountDto } from './dto/initialize-account.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ConfirmLoginDto } from './dto/confirm-login.dto';
import { sendOtpMail } from 'src/utils/mail/send-otp.mail';

@Injectable()
export class AuthenticationService {
  private userRepo = dataSource.getRepository(Users);
  private otpRepo = dataSource.getRepository(Otp);

  constructor(private readonly jwtService: JwtService) {}

  // // 🔐 Generate OTP
  // private generateOtp(): string {
  //   return Math.floor(100000 + Math.random() * 900000).toString();
  // }

  // // 1️⃣ Initialize Account
  // async initializeAccount(dto: InitializeAccountDto) {
  //   const otp = this.generateOtp();

  //   const expiresAt = new Date();
  //   expiresAt.setMinutes(expiresAt.getMinutes() + 5);

  //   await this.otpRepo.delete({ email: dto.email });

  //   await this.otpRepo.save({
  //     email: dto.email,
  //     otp,
  //     expiresAt,
  //     createdBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  //     updatedBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  //   });

  //   console.log('MAIL HOST:', process.env.MAIL_HOST);
  //   console.log('MAIL PORT:', process.env.MAIL_PORT);

  //   // ✅ SEND MAIL
  //   console.log(`Sending OTP ${otp} to email ${dto.email}`);
  //   // await sendOtpMail(dto.email, otp);
  //   try {
  //   await sendOtpMail(dto.email, otp);
  //   } catch (err) {
  //     console.error('Mail failed', err.message);
  //   }

  //   console.log(`Sent OTP ${otp} to email ${dto.email}`);

  //   return {
  //     message: 'OTP sent to your email',
  //   };
  // }

    // 🔐 Generate OTP
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  // 1️⃣ Initialize Account
  async initializeAccount(dto: InitializeAccountDto) {
    const otp = this.generateOtp();

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Remove old OTP
    await this.otpRepo.delete({ email: dto.email });

    // Save new OTP
    await this.otpRepo.save({
      email: dto.email,
      otp,
      expiresAt,
      createdBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      updatedBy: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    });

    // Send OTP email
    try {
      await sendOtpMail(dto.email, otp);
    } catch (error) {
      console.error('OTP mail failed:', error);
      throw new InternalServerErrorException('Failed to send OTP');
    }

    return {
      message: 'OTP sent to your email',
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

    await this.otpRepo.delete({ id: record.id });

    return {
      message: 'OTP verified successfully',
    };
  }

  // 3️⃣ Confirm Login (JWT)
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
      sub: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload, {
      // secret: process.env.JWT_SECRET as string,
      secret: 'mysecret',
      // expiresIn: process.env.JWT_EXPIRES_IN as string,
      expiresIn: '1d',
    });

    return {
      accessToken,
      user,
    };
  }
}
