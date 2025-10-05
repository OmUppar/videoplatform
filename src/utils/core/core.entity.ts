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
  @Column('uuid')
  updatedBy!: string;

  @Index()
  @Column('uuid')
  createdBy!: string;

  @Index()
  @CreateDateColumn()
  createdOn!: Date;

  @Index()
  @UpdateDateColumn()
  updatedOn!: Date;
}
