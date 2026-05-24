import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
      location: "Chennai"
    }
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: "Bangalore Warehouse",
      location: "Bangalore"
    }
  });

  const product1 = await prisma.product.create({
    data: {
      name: "iPhone 15",
      description: "Apple smartphone"
    }
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Samsung S24",
      description: "Samsung smartphone"
    }
  });

  await prisma.inventory.create({
    data: {
      productId: product1.id,
      warehouseId: warehouse1.id,
      totalStock: 10
    }
  });

  await prisma.inventory.create({
    data: {
      productId: product2.id,
      warehouseId: warehouse2.id,
      totalStock: 5
    }
  });

  console.log("Seed data inserted");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });