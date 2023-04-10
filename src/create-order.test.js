import { test } from 'node:test'
import assert from 'node:assert'
import { createOrder } from './create-order.js'

test('create new order', async () => {
  const order = await createOrder({
    customerId: 'customer-fake-id',
    amount: 1800
  })

  assert.ok(order.id)
})