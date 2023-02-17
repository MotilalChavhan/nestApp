import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { User } from './user/user.model';
import { Post } from './post/post.model';

@Module({
  imports: [
		SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'root@123',
      database: 'nest_db',
			models: [User, Post],
      autoLoadModels: true,
      synchronize: true,
    }),
		ConfigModule.forRoot({
			isGlobal: true
		}),
		UserModule,
		AuthModule,
		PostModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
