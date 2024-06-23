const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function update() {
    await prisma.user.upsert({
        where: { id: 1 },
        update: { name: "Alicia" },
        create: {
            name: "Alice",
            bio: "Alice's bio",
        }
    })
}

update().then(() => {
    prisma.$disconnect();
});
