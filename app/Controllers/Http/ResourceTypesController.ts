import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ResourceTypesController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/resource-types/index', {
      title: 'Resource Types',
      breadcrumb: [{ text: 'Home' }, { text: 'Manage' }, { text: 'Resource Types' }],
      icon: 'category',
    })
  }
}
