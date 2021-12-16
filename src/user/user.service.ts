import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/UserDto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async addUser(userDto: UserDto) {
    console.log('sending from service');
    var user = await this.userRepository.saveuser(userDto);
    console.log('Returning from service');
    return user;
  }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.getAllUser();
  }

  async getUserById(id: string): Promise<User> {
    return await this.userRepository.getUserById(id);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userRepository.deleteUser(id);
  }

  async getByEmail(email: string): Promise<any> {
    return await this.userRepository.findByEmail(email);
  }
}
