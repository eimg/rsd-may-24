const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function create() {
    await prisma.user.create({
        data: {
            name: "Bob",
            bio: "Bob's bio",
            posts: {
                create: [
                    { content: "First post by Bob" },
                    { content: "Another post by Bob" },
                ]
            }
        }
    });
}

create().then(() => {
    prisma.$disconnect();
});