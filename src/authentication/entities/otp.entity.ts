import { CoreEntity } from 'src/utils/core/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Otp extends CoreEntity {
  @Column()
  email: string;

  @Column()
  otp: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
