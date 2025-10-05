import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class LimitOffsetDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString({
    no_symbols: true,
  })
  limit!: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString({
    no_symbols: true,
  })
  offset!: string;
}
