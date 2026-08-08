import prisma from "../db/prisma.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are required");
        }

        const existingUser = await prisma.user.findUnique({
          where: { username },
        });
        if (existingUser) throw new Error("User already exists");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicture = `https://avatar.iran.liara.run/public/${gender === "male" ? "boy" : "girl"}?username=${username}`;

        const newUser = await prisma.user.create({
          data: {
            username,
            name,
            password: hashedPassword,
            gender,
            profilePicture,
          },
        });

        await context.login(newUser);
        return newUser;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) throw new Error("All fields are required");

        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });
        await context.login(user);
        return user;
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) throw err;
        });
        context.res.clearCookie("connect.sid");
        return { message: "Logged out successfully" };
      } catch (err) {
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: async (_, __, context) => {
      return await context.getUser();
    },
    user: async (_, { userId }) => {
      return await prisma.user.findUnique({ where: { id: userId } });
    },
  },
  User: {
    _id: (parent) => parent.id,
    transactions: async (parent) => {
      return await prisma.transaction.findMany({
        where: { userId: parent.id },
      });
    },
  },
};

export default userResolver;
