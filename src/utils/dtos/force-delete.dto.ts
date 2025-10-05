import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CoreDto } from './core.dto';

/**
 * ForceDeleteDto
 * @exports
 * @class ForceDeleteDto
 */
export class ForceDeleteDto extends CoreDto {
  /**
   * id (uuid) (required) - generally required for update and delete
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
