import { test } from '@japa/runner'

test('display home page', async ({ client }) => {
  const response = await client.get('/')

  response.assertStatus(200)
  response.assertTextIncludes('<h2>Home</h2>')
})
