import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { configuration } from 'src/config/configuration';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userService.getByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    } else {
      if (user.password === password) {
        console.log(user);
        const payload = { id: user._id, email: user.email };
        return this.jwtService.sign(payload);
      } else {
        throw new UnauthorizedException('Invalid password');
      }
    }
  }
}
