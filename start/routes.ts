/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', 'HomeController.home')
Route.get('/types/index', 'ResourceTypesController.index')
Route.get('/types/create', 'ResourceTypesController.create')
Route.post('/types/store', 'ResourceTypesController.store')
Route.get('/types/view/:id', 'ResourceTypesController.view')
Route.get('/types/edit/:id', 'ResourceTypesController.edit')
Route.post('/types/update/:id', 'ResourceTypesController.update')
