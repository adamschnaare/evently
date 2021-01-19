import axios from "axios";
import config from "config";

const suite = "users";
const apiVersion = config.get("apiVersion");
const apiUrl = config.get("apiUrl");
const url = `${apiUrl}/${apiVersion}`;

describe(suite, () => {
  const user = {
    firstName: "Firstname",
    lastName: "Lastname",
    email: "fake_email@email.com",
    password: "SomePassword",
  };
  let userInDb;
  let token;
  let options;

  console.log(`Testing Url: ${url}`);

  beforeEach(() => {
    options = {
      headers: { Authorization: `Bearer ${token}` },
    };
  });

  afterAll(async () => {
    // cleanup
    await axios.delete(`${url}/users/${userInDb.id}`, options);
  });

  it("should create a user", async () => {
    const resp = await axios.post(`${url}/users`, user);
    token = resp.data.token;

    const expected = { ...user };
    delete expected.password;
    userInDb = resp.data;

    expect(resp.status).toBe(201);
    expect(resp.data).toMatchObject(expected);
    expect(resp.data).toHaveProperty("token");
  });

  it("should be able to login with that user", async () => {
    const auth = { email: user.email, password: user.password };
    const resp = await axios.post(`${url}/auth`, auth, options);

    expect(resp.status).toBe(200);
    expect(resp.data).toBeDefined();
  });

  it("should be able to retrieve list of events", async () => {
    const resp = await axios.get(`${url}/events`, options);
    const hasRecords = resp.data.length;

    expect(resp.status).toBe(200);
    if (hasRecords) expect(resp.data[0]).toHaveProperty("id");
  });
});
