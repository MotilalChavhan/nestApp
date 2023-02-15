import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
	imports: [SequelizeModule.forFeature([User]), JwtModule.register({})],
  providers: [AuthService, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
