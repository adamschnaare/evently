import { firestore } from "firebase-admin";
import { EventI } from "../models/event";

export default class EventsService {
  constructor(private db: firestore.Firestore, private collection = "events") {}

  async create(event: EventI) {
    const docId = this.db.collection(this.collection).doc().id;
    const data: EventI = {
      ...event,
      id: docId,
    };
    await this.db.collection(this.collection).doc(docId).set(data);

    return data;
  }

  async get() {
    const query = await this.db.collection(this.collection).get();
    const docs = query.docs.map((doc) => doc.data());

    return docs;
  }
}
