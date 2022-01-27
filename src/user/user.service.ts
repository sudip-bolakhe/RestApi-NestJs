import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async addUser(userDto: UserDto) {
    return await this.userRepository.saveuser(userDto);
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.getAllUser();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      throw new NotFoundException(`User with id : {id}  not found`);
    }
    return user;
  }

  async updateUser(id: string, userDto: UserDto): Promise<User> {
    const user = await this.getUserById(id);
    return await this.userRepository.updateUser(id, userDto);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userRepository.deleteUser(id);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User with provided email not found');
    }
    return user;
  }
}
