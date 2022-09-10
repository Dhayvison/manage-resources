import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AlertMessage from 'App/Models/AlertMessage'
import Resource from 'App/Models/Resource'
import ResourceType from 'App/Models/ResourceType'

export default class ResourceController {
  public async index({ view }: HttpContextContract) {
    return view.render('pages/resources/index', {
      title: 'Resources',
      breadcrumb: [{ text: 'Manage' }, { text: 'Resource' }],
      icon: 'construction',
      resources: await Resource.all(),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/resources/create', {
      title: 'Add Resource',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Resource', route: '/resources/index' },
        { text: 'Add' },
      ],
      icon: 'add_circle',
    })
  }

  public async view({ params, view }: HttpContextContract) {
    const resource = await Resource.findOrFail(params.id)
    await resource.load('resourceType')

    return view.render('pages/resources/view', {
      title: 'View',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Resource', route: '/resources/index' },
        { text: 'Details' },
        { text: params.id },
      ],
      icon: 'visibility',
      resource,
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const resource = await Resource.findOrFail(params.id)

    return view.render('pages/resources/edit', {
      title: 'Edit',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Resource', route: '/resources/index' },
        { text: 'Update' },
        { text: params.id },
      ],
      icon: 'edit',
      resource,
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    const newResourceSchema = schema.create({
      name: schema.string(),
      quantity: schema.number([rules.unsigned(), rules.range(1, Number.MAX_SAFE_INTEGER)]),
      resourceTypeId: schema.number([rules.exists({ table: ResourceType.table, column: 'id' })]),
      resourceParentId: schema.number.optional([
        rules.exists({ table: Resource.table, column: 'id' }),
      ]),
    })

    await request.validate({
      schema: newResourceSchema,
      messages: {
        required: 'This field is required',
        unsigned: 'This field must be greater than zero',
        range: 'The value of this field must be between {{ options.start }} and {{ options.stop }}',
        exists: 'Reference not found',
      },
    })

    const resource = await Resource.create(
      request.only(['name', 'quantity', 'resourceTypeId', 'resourceParentId'])
    )

    if (resource.$isPersisted) {
      session.flash('alerts', [
        new AlertMessage(
          'success',
          'Success!',
          `The ${resource.name} resource has been registered`
        ),
      ])
    }

    response.redirect().toPath('/resources/index')
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const newResourceSchema = schema.create({
      name: schema.string(),
      quantity: schema.number([rules.unsigned(), rules.range(1, Number.MAX_SAFE_INTEGER)]),
      resourceTypeId: schema.number([rules.exists({ table: ResourceType.table, column: 'id' })]),
      resourceParentId: schema.number([rules.exists({ table: Resource.table, column: 'id' })]),
    })

    await request.validate({
      schema: newResourceSchema,
      messages: {
        required: 'This field is required',
      },
    })

    const resource = await Resource.findOrFail(params.id)

    resource.merge(request.only(['name', 'quantity', 'resourceTypeId', 'resourceParentId']))

    await resource.save()

    if (resource.$isPersisted) {
      session.flash('alerts', [
        new AlertMessage('success', 'Success!', `The ${resource.name} resource has been updated`),
      ])
    }

    response.redirect().toPath(`/resources/view/${resource.id}`)
  }

  public async delete({ params, session, response }: HttpContextContract) {
    const resource = await Resource.findOrFail(params.id)
    await resource.delete()

    if (resource.$isDeleted) {
      session.flash('alerts', [
        new AlertMessage('warning', 'Done!', `The ${resource.name} resource has been deleted`),
      ])
    } else {
      session.flash('alerts', [new AlertMessage('danger', 'Error:', 'Unable to delete record')])
    }

    response.redirect().toPath('/resources/index')
  }
}
