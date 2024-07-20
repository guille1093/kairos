import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { Category } from '../categories/entities/category.entity';
import { PaymentMethod } from '../paymentMethod/entities/paymentMethod.entity';
import { Role } from '../roles/roles.entity';
import { Organization } from '../organization/entities/organization.entity';

@Entity({ name: 'Users' })
@Unique('Users_uk', ['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  @Unique(['document'])
  document: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  lastname: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Unique(['email'])
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column()
  profileImage: string;

  @Column()
  documentSideA: string;

  @Column()
  documentSideB: string;

  @Column()
  backgroundCheck: string;

  @Column({ type: 'date', nullable: true })
  backgroundCheckDate: Date;

  @Column({ type: 'date', nullable: true })
  backgroundCheckExpirationDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  mapAdress: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @Unique(['username'])
  username: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  googleID: string;

  @ManyToOne(() => Role, (role) => role.users, {
    nullable: false,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({ foreignKeyConstraintName: 'Users_Roles_fk', name: 'roleGuid' })
  role: Role;

  @Column({ type: 'tinyint', nullable: false, default: '1' })
  isActive: number;

  @Column({ type: 'varchar', length: 250, nullable: true })
  password: string;

  @ManyToOne(() => User, (user) => user.userCreated, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({
    foreignKeyConstraintName: 'Users_fk_1',
    name: 'createdBy',
    referencedColumnName: 'guid'
  })
  createdBy?: User;

  @ManyToOne(() => User, (user) => user.userUpdated, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({
    foreignKeyConstraintName: 'Users_fk_2',
    name: 'updatedBy',
    referencedColumnName: 'guid'
  })
  updatedBy?: User;

  @ManyToOne(() => User, (user) => user.userDeleted, {
    nullable: true,
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
  @JoinColumn({
    foreignKeyConstraintName: 'Users_fk_3',
    name: 'updatedBy',
    referencedColumnName: 'guid'
  })
  deletedBy?: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => User, (user) => user.createdBy)
  userCreated: User[];

  @OneToMany(() => User, (user) => user.updatedBy)
  userUpdated: User[];

  @OneToMany(() => User, (user) => user.deletedBy)
  userDeleted: User[];

  @ManyToMany(() => Category, (category) => category.users)
  @JoinTable()
  category: Category[];

  @ManyToMany(() => PaymentMethod, (paymentMethod) => paymentMethod.users)
  @JoinTable()
  paymentMethod: PaymentMethod[];

  @ManyToMany(() => Organization, (Organization) => Organization.users)
  @JoinTable()
  Organization: PaymentMethod[];

  @Column({ type: 'varchar', length: 350, nullable: true })
  availability: string;

  @Column({ type: 'varchar', length: 550, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 3250, nullable: true })
  previusWorks: string;

  @Column({ type: 'varchar', length: 3250, nullable: true })
  certifications: string;

  @Column({ type: 'tinyint', nullable: false, default: '1' })
  isAvailable: number;
}
