import { Column, DataType, HasMany, Model, Table, Unique } from 'sequelize-typescript';
import { Post } from 'src/post/post.model';
import { Role } from './enums';

@Table
export class User extends Model {
  @Unique
  @Column
  email: string;

  @Column
  hash: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({
    type: DataType.ENUM(Role.Admin, Role.User),
    defaultValue: Role.User 
  })
  role: Role;

  @HasMany(() => Post)
  posts: Post[]

  toJSON() {
    return { ...this.get(), hash: undefined }
  }
}