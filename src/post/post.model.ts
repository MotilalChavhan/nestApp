import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Post extends Model {
  @Column
  body: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  toJSON() {
    return { ...this.get(), userId: undefined, createdAt: undefined, updatedAt: undefined }
  }
}