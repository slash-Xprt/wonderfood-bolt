import { prisma } from '../../lib/db'

export async function getProducts() {
  return prisma.product.findMany({
    include: {
      category: true,
    },
    where: {
      isAvailable: true,
    },
  })
}

export async function getProductsByCategory(categoryId: string) {
  return prisma.product.findMany({
    where: {
      categoryId,
      isAvailable: true,
    },
    include: {
      category: true,
    },
  })
}

export async function getProduct(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  })
}