import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import DependenciesChart from 'App/Models/Charts/DependenciesChart'
import ResourceType from 'App/Models/ResourceType'

export default class HomeController {
  public async home({ view }: HttpContextContract) {
    const resourceTypes = await ResourceType.all()

    return view.render('pages/home/index', {
      title: 'Home',
      breadcrumb: [{ text: 'Home' }],
      icon: 'home',
      charts: {
        dependencies: new DependenciesChart(resourceTypes),
      },
    })
  }
}
