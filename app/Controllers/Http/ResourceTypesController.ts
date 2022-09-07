import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResourceType from 'App/Models/ResourceType'
import { schema } from '@ioc:Adonis/Core/Validator'
import AlertMessage from 'App/Models/AlertMessage'

export default class ResourceTypesController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/resource-types/index', {
      title: 'Resource Types',
      breadcrumb: [{ text: 'Home' }, { text: 'Manage' }, { text: 'Resource Types' }],
      icon: 'category',
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/resource-types/create', {
      title: 'Add Resource Type',
      breadcrumb: [
        { text: 'Home' },
        { text: 'Manage' },
        { text: 'Resource Types', route: '/types/index' },
        { text: 'Add' },
      ],
      icon: 'category',
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const newResourceTypeSchema = schema.create({
      name: schema.string(),
    })

    await request.validate({ schema: newResourceTypeSchema })

    const resourceType = await ResourceType.create(request.only(['name', 'isDependent']))

    if (resourceType) {
      session.flash('alerts', [
        new AlertMessage(
          'success',
          'Success!',
          `The ${resourceType.name} resource type has been registered`
        ),
      ])
    }

    response.redirect().toPath('/types/index')
  }
}
