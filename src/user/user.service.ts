import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto.';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './interfaces/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;

    const passwordDtohash = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );

    return this.userRepository.save({
      ...createUserDto,
      password: passwordDtohash,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
