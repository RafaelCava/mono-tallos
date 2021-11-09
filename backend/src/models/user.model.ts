import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({
    name: 'groups_create_mount',
    type: 'int',
    default: 0,
    nullable: true,
  })
  groups_create_mount: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
