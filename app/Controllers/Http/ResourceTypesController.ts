import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ResourceType from 'App/Models/ResourceType'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AlertMessage from 'App/Models/AlertMessage'
import ResourceTypesService from 'App/Services/ResouceTypesService'

export default class ResourceTypesController {
  private service

  constructor() {
    this.service = new ResourceTypesService()
  }

  public async index({ request, view }: HttpContextContract) {
    const search = request.input('search')

    return view.render('pages/resource-types/index', {
      title: 'Resource Types',
      breadcrumb: [{ text: 'Manage' }, { text: 'Resource Types' }],
      icon: 'category',
      search,
      resourceTypes: await this.service.findByName(search),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/resource-types/create', {
      title: 'Add Resource Type',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Resource Types', route: '/types/index' },
        { text: 'Add' },
      ],
      icon: 'add_circle',
    })
  }

  public async view({ params, view }: HttpContextContract) {
    const resourceType = await ResourceType.findByOrFail('id', params.id)

    return view.render('pages/resource-types/view', {
      title: 'View',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Resource Types', route: '/types/index' },
        { text: 'Details' },
        { text: params.id },
      ],
      icon: 'visibility',
      resourceType,
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const resourceType = await ResourceType.findByOrFail('id', params.id)

    return view.render('pages/resource-types/edit', {
      title: 'Edit',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Resource Types', route: '/types/index' },
        { text: 'Update' },
        { text: params.id },
      ],
      icon: 'edit',
      resourceType,
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const newResourceTypeSchema = schema.create({
      name: schema.string({}, [rules.unique({ table: ResourceType.table, column: 'name' })]),
    })

    await request.validate({
      schema: newResourceTypeSchema,
      messages: {
        'required': 'This field is required',
        'name.unique': 'This name has already been registered',
      },
    })

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

  public async update({ request, response, params, session }: HttpContextContract) {
    const newResourceTypeSchema = schema.create({
      name: schema.string({}, [
        rules.unique({ table: ResourceType.table, column: 'name', whereNot: { id: params.id } }),
      ]),
    })

    await request.validate({
      schema: newResourceTypeSchema,
      messages: {
        required: 'This field is required',
      },
    })

    const resourceType = await ResourceType.findByOrFail('id', params.id)

    resourceType.merge(request.only(['name', 'isDependent']))
    resourceType.isDependent = request.input('isDependent', null)

    await resourceType.save()

    if (resourceType) {
      session.flash('alerts', [
        new AlertMessage(
          'success',
          'Success!',
          `The ${resourceType.name} resource type has been updated`
        ),
      ])
    }

    response.redirect().toPath(`/types/view/${resourceType.id}`)
  }

  public async delete({ params, session, response }: HttpContextContract) {
    const resourceType = await ResourceType.findOrFail(params.id)
    await resourceType.delete()

    if (resourceType.$isDeleted) {
      session.flash('alerts', [
        new AlertMessage(
          'warning',
          'Done!',
          `The ${resourceType.name} resource type has been deleted`
        ),
      ])
    } else {
      session.flash('alerts', [new AlertMessage('danger', 'Error:', 'Unable to delete record')])
    }

    response.redirect().toPath('/types/index')
  }
}
