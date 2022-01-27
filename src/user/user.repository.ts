import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async saveuser(user: UserDto): Promise<User> {
    let userToSave = new this.userModel(user);
    return userToSave.save();
  }

  async getAllUser(): Promise<User[]> {
    return await this.userModel.find({});
  }

  async getUserById(id: string): Promise<User> {
    return await this.userModel.findOne({ _id: id });
  }

  async updateUser(id: string, userDto: UserDto): Promise<User> {
    return await this.userModel.findOneAndUpdate({ _id: id }, userDto);
  }

  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
}
