import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'messages' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  user_id: number;

  @Column()
  group_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  send_at: Date;
}
