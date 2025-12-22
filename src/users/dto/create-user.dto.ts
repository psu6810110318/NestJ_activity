import { UserRole } from '../entities/user.entity';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsEmail() // ถ้ายังไม่ได้ลง class-validator ให้ลบ @Is... ออกก่อนได้ครับ
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}