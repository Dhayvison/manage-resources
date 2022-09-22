import { test } from '@japa/runner'

test('display resource types page', async ({ client }) => {
  const response = await client.get('/types/index')

  response.assertStatus(200)
  response.assertTextIncludes('<h2>Resource Types</h2>')
})
