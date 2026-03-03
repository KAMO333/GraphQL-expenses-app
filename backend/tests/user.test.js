import { jest } from "@jest/globals";
import { connect, closeDatabase, clearDatabase } from "./setup.js";
import userResolver from "../resolvers/user.resolver.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Setup and Teardown for the In-Memory DB
beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("User Resolver - Mutation: signUp", () => {
  it("should successfully sign up a new user and hash the password", async () => {
    const input = {
      username: "kamogelo_dev",
      name: "Kamogelo Mmopane",
      password: "SecurePassword123",
      gender: "male",
    };

    // We mock the context because the resolver calls context.login(newUser)
    const context = {
      login: jest.fn().mockImplementation((user) => Promise.resolve(user)),
    };

    // Call the resolver directly
    const result = await userResolver.Mutation.signUp(null, { input }, context);

    // Assertions
    expect(result.username).toBe("kamogelo_dev");
    expect(result.name).toBe("Kamogelo Mmopane");
    expect(result.profilePicture).toContain("avatar.iran.liara.run");
    expect(context.login).toHaveBeenCalled();

    // Check the database to ensure the user exists and password is HASHED
    const userInDb = await User.findOne({ username: "kamogelo_dev" });
    expect(userInDb).toBeDefined();

    // Ensure the plain text password isn't stored
    expect(userInDb.password).not.toBe("SecurePassword123");

    // Verify the hash works with bcrypt
    const isMatch = await bcrypt.compare(
      "SecurePassword123",
      userInDb.password,
    );
    expect(isMatch).toBe(true);
  });

  it("should throw an error if a required field is missing", async () => {
    const input = { username: "incomplete" };
    const context = { login: jest.fn() };

    await expect(
      userResolver.Mutation.signUp(null, { input }, context),
    ).rejects.toThrow("All fields are required");
  });
});
