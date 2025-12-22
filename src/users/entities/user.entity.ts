import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { Book } from '../../book/entities/book.entity'; // ✅ Import Book

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 👇 ส่วนที่เพิ่ม: เก็บรายการหนังสือที่ User คนนี้กดไลก์ไว้
  @ManyToMany(() => Book, (book) => book.likedBy)
  likedBooks: Book[];
}