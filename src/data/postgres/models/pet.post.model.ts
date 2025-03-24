import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.model';

export enum PetPostStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

@Entity()
export class PetPost extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.petPosts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('varchar', { length: 255 })
  pet_name: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 255, nullable: false })
  image_url: string;

  @Column({
    type: 'enum',
    enum: PetPostStatus,
    default: PetPostStatus.APPROVED,
  })
  status: PetPostStatus;

  @Column('boolean', { default: false })
  isFound: boolean;

  @CreateDateColumn()
  created_at: Date;
}
