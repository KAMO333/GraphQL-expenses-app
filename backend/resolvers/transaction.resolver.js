import prisma from "../db/prisma.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      const user = await context.getUser();
      if (!user) throw new Error("Unauthorized");

      return await prisma.transaction.findMany({
        where: { userId: user.id },
      });
    },
    transaction: async (_, { transactionId }) => {
      return await prisma.transaction.findUnique({
        where: { id: transactionId },
      });
    },
    categoryStatistics: async (_, __, context) => {
      const user = await context.getUser();
      if (!user) throw new Error("Unauthorized");

      const groupedTransactions = await prisma.transaction.groupBy({
        by: ["category"],
        where: { userId: user.id },
        _sum: { amount: true },
      });

      return groupedTransactions.map((group) => ({
        category: group.category,
        totalAmount: group._sum.amount || 0,
      }));
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      const user = await context.getUser();
      if (!user) throw new Error("Unauthorized");

      return await prisma.transaction.create({
        data: {
          description: input.description,
          paymentType: input.paymentType,
          category: input.category,
          amount: input.amount,
          location: input.location,
          date: new Date(input.date),
          userId: user.id,
        },
      });
    },
    updateTransaction: async (_, { input }) => {
      const { transactionId, ...updateData } = input;
      if (updateData.date) {
        updateData.date = new Date(updateData.date);
      }

      return await prisma.transaction.update({
        where: { id: transactionId },
        data: updateData,
      });
    },
    deleteTransaction: async (_, { transactionId }) => {
      return await prisma.transaction.delete({
        where: { id: transactionId },
      });
    },
  },
  Transaction: {
    _id: (parent) => parent.id,
    user: async (parent) => {
      return await prisma.user.findUnique({ where: { id: parent.userId } });
    },
  },
};

export default transactionResolver;
