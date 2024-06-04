import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Notification } from './notification.entity';

@Entity({ name: 'NotificationType' })
export class NotificationType {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ type: 'varchar', length: 1500, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 1500, nullable: false })
  description: string;

  @Column({ type: 'tinyint', nullable: false, default: '1' })
  isActive: number;

  @OneToMany(() => Notification, (notification) => notification.notificationType)
  notification: Notification[];
}
