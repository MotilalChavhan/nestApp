import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as argon from 'argon2';
import { Post } from 'src/post/post.model';
import { UserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({ include: [Post] });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
      include: [Post]
    });

    if (!user) {
      throw new NotFoundException("user not found");
    }

    return user;
  }

  async update(id: string, userDto: UserDto): Promise<{msg: string}> {
    const hash = await argon.hash(userDto.password);

    const user = await this.userModel.update({
      email: userDto.email,
      hash,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
    }, {
      where: {
        id,
      }
    });

    if (!user[0]) {
      throw new NotFoundException("user not found");
    }

    return { msg: "user data updated successfully" };
  }

  async remove(id: string): Promise<{msg: string}> {
    const user = await this.userModel.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException("user not found");
    }

    await user.destroy();

    return { msg: "user destroyed successfully" };
  }
}
