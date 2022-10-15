import MeasurementUnit from 'App/Models/MeasurementUnit'

export default class MeasurementUnitService {
  public findByName(name: string) {
    let data = MeasurementUnit.query()
    if (name) {
      data = data.where('name', 'like', `%${name}%`)
    }
    return data
  }
}
