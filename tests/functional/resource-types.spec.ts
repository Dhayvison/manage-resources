import { test } from '@japa/runner'

test('display resource types page', async ({ client }) => {
  const response = await client.get('/types/index')

  response.assertStatus(200)
  response.assertTextIncludes('<h2>Resource Types</h2>')
})

test('display resource types create page', async ({ client }) => {
  const response = await client.get('/types/create')

  response.assertStatus(200)
  response.assertTextIncludes('<h2>Add Resource Type</h2>')
})
