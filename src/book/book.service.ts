import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({ relations: ['category'] }); // ดึงหมวดหมู่มาโชว์ด้วย
  }

  findOne(id: string) {
    return this.bookRepository.findOne({ 
      where: { id },
      relations: ['category'] 
    });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: string) {
    return this.bookRepository.delete(id);
  }

  // 👇 นี่คือฟังก์ชันกดไลก์ที่คุณถามถึงครับ
  async incrementLikes(id: string) {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    book.likeCount += 1;
    return this.bookRepository.save(book);
  }
}