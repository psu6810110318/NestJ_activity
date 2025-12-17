import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoryModule } from './book-category/book-category.module'; // (อาจจะมีอยู่แล้ว)
import { BookCategory } from './book-category/entities/book-category.entity'; // <--- 1. อย่าลืม Import บรรทัดนี้!
import { BookModule } from './book/book.module';
import { Book } from './book/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password123',
      database: 'bookstore_dev',
      entities: [BookCategory, Book],  
      synchronize: true,
    }),
    BookCategoryModule,
    BookModule,
  ],
})
export class AppModule {}