import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from './dto/UserDto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addUser(@Body() body: UserDto) {
    return await this.userService.addUser(body);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(id);
    return { message: 'User deleted successfully!!' };
  }

  @Put(':id')
  async updateUser() {
    return;
  }
}
