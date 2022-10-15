import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class MeasurementUnit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public symbol: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public schema() {
    return schema.create({
      name: schema.string({}, [
        rules.unique({
          table: MeasurementUnit.table,
          column: 'name',
          ...(this.id && { whereNot: { id: this.id } }),
        }),
      ]),
      symbol: schema.string({}, [
        rules.unique({
          table: MeasurementUnit.table,
          column: 'symbol',
          ...(this.id && { whereNot: { id: this.id } }),
        }),
      ]),
    })
  }
}
