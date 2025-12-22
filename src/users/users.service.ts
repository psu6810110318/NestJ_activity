import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const admin = await this.findOneByEmail('admin@bookstore.com');
    if (!admin) {
      console.log('Seeding Admin User...');
      await this.create({
        email: 'admin@bookstore.com',
        password: 'adminpassword',
        role: UserRole.ADMIN,
      });
    }
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    const user = this.userRepository.create({ 
      ...createUserDto, 
      password: hashedPassword 
    });
    return this.userRepository.save(user);
  }

  async findOneByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id: id as any });
  }

  async update(id: string, updateUserDto: any) {
    return this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return this.userRepository.delete(id);
  }
}