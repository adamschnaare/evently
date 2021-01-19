import request from "supertest";
import app from "../../src/app";
import firebase from "firebase-admin";
import { AppDependencies } from "../../src/startup/dependencies";
import { User } from "../../src/models/user";

const collection = "events";
const endpoint = `/${collection}`;

describe(endpoint, () => {
  const admin = firebase.initializeApp();
  const db = admin.firestore();
  const dependencies: AppDependencies = { admin, db };
  const server = request(app(dependencies));

  const user = {
    email: "email@email.com",
  };
  const token = `Bearer ${User.generateAuthToken(user)}`;
  const event = {
    id: "event12345",
    title: "Event Title",
    date: new Date(),
    location: "Location",
    owner: "ownerId1234",
    costInCents: 1234,
  };

  afterEach(async () => {
    // delete data
    await cleanCollection(db, collection);
  });
  afterAll(async () => {
    // delete app
    firebase.apps.map((app) => app.delete());
  });

  describe("GET /", () => {
    it("should get all the users", async () => {
      // seed data
      await db.collection(collection).add(event);

      const resp = await server.get(endpoint).set("Authorization", token);
      const expected = { ...event };
      delete expected.date;
      // TODO: hard-code the formatting here
      const reformatted = resp.body[0];
      //   console.log(reformatted);
      //   reformatted.date = new Date(reformatted.date._nanoseconds);

      expect(resp.body.length).toBe(1);
      expect(reformatted).toMatchObject(expected);
    });
  });

  //   describe.skip("POST /", () => {
  //     it("should create an event", async () => {
  //       const resp = await server.post(endpoint).send(user);
  //       const { id } = resp.body;

  //       const expected = { ...user, id };

  //       // check the db
  //       const query = await db
  //         .collection(collection)
  //         .where("email", "==", "email@email.com")
  //         .get();
  //       const docs = await query.docs.map((doc) => doc.data());

  //       // remove passwords from test (will test hashing elsewhere)
  //       delete docs[0].password;
  //       const dbExpected = { ...user, id };
  //       delete dbExpected.password;

  //       expect(resp.status).toBe(201);
  //       expect(resp.body).toMatchObject(expected);
  //       expect(resp.body).toHaveProperty("token");
  //       expect(docs.length).toBe(1);
  //       expect(docs[0]).toMatchObject(dbExpected);
  //     });

  //     it("should fail if given invalid data", async () => {
  //       const data = { ...user };
  //       delete data.email;

  //       const resp = await server.post(endpoint).send(data);

  //       expect(resp.status).toBe(400);
  //     });

  //     it("should fail if user exists", async () => {
  //       await server.post(endpoint).send(user);
  //       const resp = await server.post(endpoint).send(user);

  //       expect(resp.status).toBe(400);
  //     });
  //   });

  //   describe("DELETE /:id", () => {
  //     it("should delete a user with given id", async () => {
  //       // seed data
  //       const { id } = await db.collection(collection).add(user);

  //       const resp = await server
  //         .delete(`${endpoint}/${id}`)
  //         .set("Authorization", token);

  //       expect(resp.status).toBe(204);
  //     });
  //   });
});

const cleanCollection = async (db, colleciton) => {
  const docs = await db.collection(collection).get();
  return docs.forEach(async (doc) => await doc.ref.delete());
};
