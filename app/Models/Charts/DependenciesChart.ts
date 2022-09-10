import ResourceType from '../ResourceType'

export default class DependenciesChart {
  public readonly labels: string[]
  public data: ResourceType[]
  public readonly backgroundColor: string[]

  constructor(data: ResourceType[]) {
    this.data = data
    this.labels = ['Dependents', 'No Dependents']
    this.backgroundColor = ['#ffc107', '#0dcaf0']
  }

  public getDependents() {
    return this.data.filter((type) => {
      return type.isDependent
    })
  }

  public getNotDependents() {
    return this.data.filter((type) => {
      return !type.isDependent
    })
  }

  public getArrayDataString(array: []) {
    return array
      .map((data) => {
        return `'${data}'`
      })
      .join(',')
  }
}
