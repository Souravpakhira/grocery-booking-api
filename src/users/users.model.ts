import {
  Column,
  Model,
  Table,
  DataType,
  BeforeCreate,
  BeforeUpdate,
} from 'sequelize-typescript';
import { Role } from 'src/common/constants';
import * as bcrypt from 'bcrypt';

@Table({
  tableName: 'users',
  paranoid: true,
  timestamps: true,
})
export class Users extends Model<Users> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM(...Object.values(Role)),
    defaultValue: Role.User,
  })
  role: Role;

  validPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeCreate
  static async hashPasswordOnCreate(user: Users): Promise<void> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
  }

  @BeforeUpdate
  static async hashPasswordOnUpdate(user: Users): Promise<void> {
    if (user.changed('password')) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  }
}
