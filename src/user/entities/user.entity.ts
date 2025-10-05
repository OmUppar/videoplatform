import { CoreEntity } from 'src/utils/core/core.entity';
// user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User extends CoreEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'basic' })
  plan: string;
}
