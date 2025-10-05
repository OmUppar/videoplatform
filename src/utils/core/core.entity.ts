import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Core Entity
 * @export
 * @class CoreEntity
 * @extends {Entity}
 * @requires {@link Column}
 * @requires {@link Entity}
 * @requires {@link PrimaryGeneratedColumn}
 * @returns {CoreEntity}
 */
@Entity()
export class CoreEntity {
  @Index()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column('uuid', { default: '687e39c5-b534-8006-b1b9-dafaa342b2de' })
  updatedBy!: string;

  @Index()
  @Column('uuid', { default: '687e39c5-b534-8006-b1b9-dafaa342b2de' })
  createdBy!: string;

  @Index()
  @CreateDateColumn()
  createdOn!: Date;

  @Index()
  @UpdateDateColumn()
  updatedOn!: Date;
}
