import { CoreEntity } from 'src/utils/core/core.entity';
import { Entity, Column } from 'typeorm';

@Entity('users')
export class Users extends CoreEntity {
  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
