import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, 
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test',
      password: 'root@123',
      database: 'nest_db',
      autoLoadModels: true,
      synchronize: true,
      define: {
        defaultScope: {
          attributes: {
            exclude: ['hash']
          }
        }
      }
    }), AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
