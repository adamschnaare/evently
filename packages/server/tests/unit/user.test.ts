import { User } from "../../src/models/user";

describe("User", () => {
  const user = {
    firstName: "Firstname",
    lastName: "Lastname",
    email: "email@email.com",
    password: "password",
  };

  it("should make a User object", () => {
    const data = new User(user);
    const result = data.fullName();
    const expected = "Firstname Lastname";

    expect(result).toBe(expected);
  });

  it("should return validate `true` a valid schema", () => {
    const { error } = User.validate(user);

    expect(error).toBe(undefined);
  });

  it("should return validate `false` an invalid schema", () => {
    const data = { ...user };
    delete data.email;

    const { error } = User.validate(data);

    expect(error).toBeDefined();
    expect(error.message.includes("email")).toBe(true);
  });
});
