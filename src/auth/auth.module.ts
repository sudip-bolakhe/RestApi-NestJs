import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import { configuration } from '../config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt_secretssssss@123'),
          signOptions: { expiresIn: '2h' },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  providers: [AuthService, JWTStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
