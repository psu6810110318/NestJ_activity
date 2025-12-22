import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';


import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/entities/user.entity'; 

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN)               
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN)               
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard) 
  @Roles(UserRole.ADMIN)               
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  
  @Patch(':id/like')
  @UseGuards(JwtAuthGuard)
  likeBook(@Param('id') id: string, @CurrentUser() user: any) {
    return this.bookService.toggleLike(id, user.userId);
  }
}