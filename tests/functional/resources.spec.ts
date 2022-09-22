import { test } from '@japa/runner'

test('display resources page', async ({ client }) => {
  const response = await client.get('/resources/index')

  response.assertStatus(200)
  response.assertTextIncludes('<h2>Resources</h2>')
})

test('display resource create page', async ({ client }) => {
  const response = await client.get('/resources/create')

  response.assertStatus(200)
  response.assertTextIncludes('<h2>Add Resource</h2>')
})
