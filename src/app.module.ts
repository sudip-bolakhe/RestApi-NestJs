import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { configuration } from './config/configuration';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    MongooseModule.forRoot(configuration().databaseUrl),
    AuthModule,
  ],
})
export class AppModule {}
