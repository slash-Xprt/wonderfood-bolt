import { prisma } from '../../lib/db'
import type { OrderStatus } from '@prisma/client'

interface CreateOrderInput {
  customerName: string
  customerEmail: string
  customerPhone: string
  pickupTime: Date
  items: {
    productId: string
    quantity: number
    price: number
  }[]
}

export async function createOrder(input: CreateOrderInput) {
  const total = input.items.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return prisma.order.create({
    data: {
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      pickupTime: input.pickupTime,
      total,
      items: {
        create: input.items.map(item => ({
          quantity: item.quantity,
          price: item.price,
          product: {
            connect: { id: item.productId }
          }
        }))
      }
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  return prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })
}

export async function getOrder(id: string) {
  return prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  })
}

export async function getOrders() {
  return prisma.order.findMany({
    include: {
      items: {
        include: {
          product: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
}