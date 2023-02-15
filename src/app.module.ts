import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
		SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'root@123',
      database: 'nest_db',
      autoLoadModels: true,
      synchronize: true,
    }),
		ConfigModule.forRoot({
			isGlobal: true
		}),
		UserModule,
		AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
