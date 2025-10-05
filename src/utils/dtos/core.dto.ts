import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

/**
 * Core uuid Data transfer object
 * @exports
 * @class CoreDto
 */
export class CoreDto {
  /**
   * id (uuid) (required) - generally required for update and delete
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id!: string;
}
