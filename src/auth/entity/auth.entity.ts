import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class Auth {
  @PrimaryGeneratedColumn()
  @IsNotEmpty({ message: 'Id is required' })
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;
}