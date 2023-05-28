import {
  Table,
  Model,
  Column,
  AllowNull,
  Unique,
  DataType,
} from 'sequelize-typescript';
import { InferAttributes } from 'sequelize';

@Table({ tableName: 'chuck_user', timestamps: false, underscored: true })
export class ChuckUser extends Model<InferAttributes<ChuckUser>> {
  @AllowNull(false)
  @Column(DataType.STRING)
  declare firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare lastName: string;

  @AllowNull(false)
  @Unique(true)
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare salt: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;
}
