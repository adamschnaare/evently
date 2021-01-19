import { initializeApp } from "firebase-admin";
import faker from "faker";
import { User } from "../models/user";
// import { EventI } from "./src/models/event";

// services
const admin = initializeApp(undefined, "seed");
const db = admin.firestore();

const generateEvents = async (amount: number) => {
  const collection = "events";
  const docs = await db.collection(collection).listDocuments();
  const hasDocs = docs.length;
  if (hasDocs) return;

  const events = new Array(amount).fill({}).map(async () => {
    const id = db.collection(collection).doc().id;
    const data = {
      id,
      title: faker.random.words(2),
      date: faker.date.future(),
      location: faker.address.city(),
      owner: faker.random.uuid(),
      costInCents: faker.random.number(100000),
    };
    try {
      return await db.collection(collection).doc(id).set(data);
    } catch (error) {
      return console.log(error);
    }
  });
  return await Promise.all(events);
};

const generateUsers = async (amount: number) => {
  const collection = "users";
  const docs = await db.collection(collection).listDocuments();
  const hasDocs = docs.length;
  if (hasDocs) return;

  const users = new Array(amount).fill({}).map(async () => {
    const id = db.collection(collection).doc().id;
    const data = {
      id,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: await User.generateHashPassword(faker.internet.password()),
    };
    try {
      return await db.collection(collection).doc(id).set(data);
    } catch (error) {
      return console.log(error);
    }
  });
  return await Promise.all(users);
};

export default async (req: any, res: any) => {
  const users = parseInt(req.body.users);
  await generateUsers(users);

  const events = parseInt(req.body.events);
  await generateEvents(events);

  const messages = {
    users: `Generated ${users} users`,
    events: `Generated ${events} events`,
  };
  res.send(messages);
};
