import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const phone = '13800000000'
  const exists = await prisma.user.findUnique({ where: { phone } })
  if (exists) return
  const passwordHash = await bcrypt.hash('123456', 10)
  await prisma.user.create({
    data: {
      phone,
      displayName: '默认用户',
      passwordHash,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  })
