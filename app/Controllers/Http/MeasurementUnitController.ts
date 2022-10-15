import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AlertMessage from 'App/Models/AlertMessage'
import MeasurementUnit from 'App/Models/MeasurementUnit'
import MeasurementUnitService from 'App/Services/MeasurementUnitService'

export default class MeasurementUnitController {
  private service

  constructor() {
    this.service = new MeasurementUnitService()
  }

  public async index({ request, view }: HttpContextContract) {
    const search = request.input('search')

    return view.render('pages/measurement-units/index', {
      title: 'Measurement Units',
      breadcrumb: [{ text: 'Manage' }, { text: 'Measurements Units' }],
      icon: 'straighten',
      search,
      units: await this.service.findByName(search),
    })
  }

  public async create({ view }: HttpContextContract) {
    return view.render('pages/measurement-units/create', {
      title: 'Add Measurement Unit',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Measurement Units', route: '/unit/index' },
        { text: 'Add' },
      ],
      icon: 'add_circle',
    })
  }

  public async view({ params, view }: HttpContextContract) {
    const unit = await MeasurementUnit.findByOrFail('id', params.id)

    return view.render('pages/measurement-units/view', {
      title: 'View',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Measurement Units', route: '/unit/index' },
        { text: 'Details' },
        { text: params.id },
      ],
      icon: 'visibility',
      unit,
    })
  }

  public async edit({ params, view }: HttpContextContract) {
    const unit = await MeasurementUnit.findByOrFail('id', params.id)

    return view.render('pages/measurement-units/edit', {
      title: 'Edit',
      breadcrumb: [
        { text: 'Manage' },
        { text: 'Measurement Units', route: '/unit/index' },
        { text: 'Update' },
        { text: params.id },
      ],
      icon: 'edit',
      unit,
    })
  }

  public async store({ request, response, session }: HttpContextContract) {
    await request.validate({
      schema: new MeasurementUnit().schema(),
      messages: {
        required: 'This field is required',
      },
    })

    const unit = await MeasurementUnit.create(request.only(['name', 'symbol']))

    if (unit.$isPersisted) {
      session.flash('alerts', [
        new AlertMessage(
          'success',
          'Success!',
          `The ${unit.name} measurement unit has been registered`
        ),
      ])
    }

    response.redirect().toPath('/unit/index')
  }

  public async update({ request, response, params, session }: HttpContextContract) {
    const unit = await MeasurementUnit.findByOrFail('id', params.id)

    await request.validate({
      schema: unit.schema(),
      messages: {
        required: 'This field is required',
      },
    })

    unit.merge(request.only(['name', 'symbol']))

    await unit.save()

    if (unit.$isPersisted) {
      session.flash('alerts', [
        new AlertMessage(
          'success',
          'Success!',
          `The ${unit.name} measurement unit has been updated`
        ),
      ])
    }

    response.redirect().toPath(`/unit/view/${unit.id}`)
  }

  public async delete({ params, session, response }: HttpContextContract) {
    const unit = await MeasurementUnit.findOrFail(params.id)
    await unit.delete()

    if (unit.$isDeleted) {
      session.flash('alerts', [
        new AlertMessage('warning', 'Done!', `The ${unit.name} measurement unit has been deleted`),
      ])
    } else {
      session.flash('alerts', [new AlertMessage('danger', 'Error:', 'Unable to delete record')])
    }

    response.redirect().toPath('/unit/index')
  }
}
