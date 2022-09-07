import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HomeController {
  public async home({ view }: HttpContextContract) {
    return view.render('pages/home', {
      title: 'Home',
      breadcrumb: [{ text: 'Home' }],
      icon: 'home',
      alert: {
        type: 'success',
        title: 'Welcome aboard!',
        description: 'It is a pleasure to have you join our team. Let us create magic',
      },
    })
  }
}
