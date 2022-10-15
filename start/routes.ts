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

Route.group(() => {
  Route.get('/index', 'ResourceTypesController.index')
  Route.get('/view/:id', 'ResourceTypesController.view')
  Route.get('/edit/:id', 'ResourceTypesController.edit')
  Route.get('/create', 'ResourceTypesController.create')
  Route.post('/store', 'ResourceTypesController.store')
  Route.post('/update/:id', 'ResourceTypesController.update')
  Route.post('/delete/:id', 'ResourceTypesController.delete')
}).prefix('/types')

Route.group(() => {
  Route.get('/index', 'MeasurementUnitController.index')
  Route.get('/view/:id', 'MeasurementUnitController.view')
  Route.get('/edit/:id', 'MeasurementUnitController.edit')
  Route.get('/create', 'MeasurementUnitController.create')
  Route.post('/store', 'MeasurementUnitController.store')
  Route.post('/update/:id', 'MeasurementUnitController.update')
  Route.post('/delete/:id', 'MeasurementUnitController.delete')
}).prefix('/unit')

Route.group(() => {
  Route.get('/index', 'ResourceController.index')
  Route.get('/view/:id', 'ResourceController.view')
  Route.get('/edit/:id', 'ResourceController.edit')
  Route.get('/create', 'ResourceController.create')
  Route.post('/store', 'ResourceController.store')
  Route.post('/update/:id', 'ResourceController.update')
  Route.post('/delete/:id', 'ResourceController.delete')
}).prefix('/resources')
