import { Column, Model, Table, Unique } from 'sequelize-typescript';

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

  @Column({ defaultValue: true })
  isActive: boolean;

  toJSON() {
    return { ...this.get(), hash: undefined }
  }
}