import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity'; // Import User

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  // ... (Method อื่นๆ create, findAll, update, remove เก็บไว้เหมือนเดิม) ...
  create(createBookDto: CreateBookDto) { return this.bookRepository.save(createBookDto); }
  findAll() { return this.bookRepository.find({ relations: ['category'] }); }
  findOne(id: string) { return this.bookRepository.findOne({ where: { id }, relations: ['category'] }); }
  update(id: string, updateBookDto: UpdateBookDto) { return this.bookRepository.update(id, updateBookDto); }
  remove(id: string) { return this.bookRepository.delete(id); }

  // 👇 แก้ไขฟังก์ชันนี้ใหม่หมดเลยครับ (เปลี่ยนชื่อเป็น toggleLike ให้สื่อความหมาย)
  async toggleLike(bookId: string, userId: string) {
    // 1. ดึงข้อมูลหนังสือ พร้อมรายชื่อคนกดไลก์ (Relations)
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['likedBy'], 
    });

    if (!book) {
      throw new NotFoundException(`Book not found`);
    }

    
    const userIndex = book.likedBy.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      
      book.likedBy.splice(userIndex, 1);
      book.likeCount -= 1; 
    } else {
      
      const user = new User();
      user.id = userId; 
      book.likedBy.push(user);
      book.likeCount += 1; 
    }

    
    return this.bookRepository.save(book);
  }
}