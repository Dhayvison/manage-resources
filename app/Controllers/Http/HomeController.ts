import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async home({ view }: HttpContextContract) {
    return view.render('pages/home', {
      title: 'Home',
      breadcrumb: [{ text: 'Home' }],
      icon: 'home',
    })
  }
}
