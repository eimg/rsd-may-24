const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function read() {
    const data = await prisma.user.findFirst({
        where: { id: 2 },
        include: { posts: true },
    });

    return data;
}

read().then(data => {
    console.log(data);
    prisma.$disconnect();
});
