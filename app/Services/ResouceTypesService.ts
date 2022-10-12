import ResourceType from 'App/Models/ResourceType'

export default class ResourceTypesService {
  public findByName(name: string) {
    let data = ResourceType.query()
    if (name) {
      data = data.where('name', 'like', `%${name}%`)
    }
    return data
  }
}
