import {
  Table,
  Model,
  Column,
  AllowNull,
  Unique,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'chuck_user', timestamps: false, underscored: true })
export class ChuckUser extends Model {
  @AllowNull(false)
  @Column(DataType.STRING)
  firstName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  salt!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;
}
