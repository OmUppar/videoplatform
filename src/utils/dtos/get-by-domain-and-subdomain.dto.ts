import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

/**
 * Fetch Based on Domain-related uuids (domain + subdomain)
 */
export class GetByDomainAndSubDomainDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  domainId!: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  subDomainId?: string;
}
