import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/UserDto';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async saveuser(user: UserDto): Promise<User> {
    console.log('Saving in repository');
    let userToSave = new this.userModel(user);
    console.log('Saved in respository');
    return await userToSave.save();
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.userModel.find({}).exec();
    return users;
  }

  async getUserById(id) {
    const users = await this.userModel.findOne({ _id: id });
    return users;
  }

  async deleteUser(id: string) {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
}
