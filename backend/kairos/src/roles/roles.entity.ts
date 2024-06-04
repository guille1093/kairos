import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: 'Roles' })
export class Role {
  @PrimaryColumn({ type: 'varchar', length: 38, nullable: false })
  guid: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  role: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  description?: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
