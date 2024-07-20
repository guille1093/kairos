import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/users.entity';
import { NotificationType } from './notificationType.entity';

@Entity({ name: 'Notification' })
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ type: 'varchar', length: 1500, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 1500, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 1500, nullable: true })
  link: string;

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

  @ManyToOne(() => NotificationType, (notificationType) => notificationType.notification)
  notificationType: NotificationType;
}
