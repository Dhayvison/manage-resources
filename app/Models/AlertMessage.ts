type AlertType =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark'

export default class AlertMessage {
  public readonly type: AlertType
  public readonly title: string
  public readonly description: string

  constructor(type: AlertType, title: string, description: string) {
    this.type = type
    this.title = title
    this.description = description
  }
}
