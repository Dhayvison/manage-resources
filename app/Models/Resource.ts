import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import ResourceType from './ResourceType'

export default class Resource extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public quantity: number

  @column()
  public resourceTypeId: number

  @column()
  public resourceParentId: number

  @belongsTo(() => ResourceType)
  public resourceType: BelongsTo<typeof ResourceType>

  @hasMany(() => Resource, {
    foreignKey: 'resourceParentId',
  })
  public resourceChild: HasMany<typeof Resource>

  @belongsTo(() => Resource)
  public resourceParent: BelongsTo<typeof Resource>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
