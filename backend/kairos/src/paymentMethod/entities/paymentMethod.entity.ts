import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { User } from '../../users/users.entity';

@Entity({ name: 'PaymentMethod' })
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'tinyint', nullable: false, default: '1' })
  isActive: number;

  @ManyToOne(() => User, (user) => user.userCreated, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  createdBy?: User;

  @ManyToOne(() => User, (user) => user.userUpdated, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  updatedBy?: User;

  @ManyToOne(() => User, (user) => user.userDeleted, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  deletedBy?: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToMany(() => User, (user) => user.paymentMethod)
  users: User[];
}
