import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PetPost } from './pet.post.model';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 70,
    nullable: false,
  })
  name: string;

  @Column('varchar', {
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column('varchar', {
    length: 255,
    nullable: false,
  })
  password: string;

  @Column('enum', { enum: UserRole, default: UserRole.USER, nullable: false })
  role: UserRole;

  @Column('enum', {
    enum: UserStatus,
    default: UserStatus.INACTIVE,
    nullable: false,
  })
  status: UserStatus;

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;
  @OneToMany(() => PetPost, (petPost) => petPost.user)
  petPosts: PetPost[];
}
