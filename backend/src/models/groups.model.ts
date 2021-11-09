import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'groups' })
export class Groups {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  user_creator_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
