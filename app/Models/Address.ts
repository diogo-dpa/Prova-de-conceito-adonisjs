import { DateTime } from 'luxon';
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasOne,
  hasOne,
} from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  public id: string;

  @column()
  public street: string;

  @column()
  public neighborhood: string;

  @column()
  public state: string;

  @column()
  public country: string;

  @column()
  public complement: string | null;

  @column()
  public zipCode: string;

  @hasOne(() => User, {
    foreignKey: 'id',
  })
  public user_id: HasOne<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
