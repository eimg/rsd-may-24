const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

prisma.user.delete({
	where: { id: 1 },
}).then(() => {
    prisma.$disconnect;
});
