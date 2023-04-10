import { transport } from './mail/transport.js'

export async function createOrder(data, ordersRepository) {
  const { customerId, amount } = data
  const isPriority = amount > 3000


  const order = await ordersRepository.create({
    customerId, isPriority, amount
  })

  const amountFormatted = new Intl.NumberFormat("en-US", { 
    style: "currency", 
    currency: "USD" }
  ).format(amount)

  await transport.sendMail({
    from: {
      name: 'Vinicius Benedito',
      address: 'beneditoloura@gmail.com',
    },
    to: {
      name: 'Vinicius Benedito',
      address: 'beneditoloura@gmail.com',
    },
    subject: `New order #${order.id}`,
    html: `<strong>New order:</strong> ${order.id} with amount of ${amountFormatted}`
  })

  return order
}