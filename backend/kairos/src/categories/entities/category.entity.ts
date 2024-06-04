import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/users.entity';


@Entity({ name: 'Categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 250, nullable: true })
  description: string;

  @Column({ type: 'tinyint', nullable: false, default: '1' })
  isActive: number;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.userCreated, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  createdBy?: User;

  @ManyToOne(() => User, (user) => user.userUpdated, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  updatedBy?: User;

  @ManyToOne(() => User, (user) => user.userDeleted, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  deletedBy?: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => User, (user) => user.category)
  users: User[];
  category: Category;
}
