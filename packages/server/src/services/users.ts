import { firestore } from "firebase-admin";
import { UserI, User } from "../models/user";

export default class UsersService {
  constructor(private db: firestore.Firestore, private collection = "users") {}

  async create(user: UserI) {
    const docId = this.db.collection(this.collection).doc().id;
    const data: UserI = {
      ...user,
      id: docId,
      password: await User.generateHashPassword(user.password),
      dateAdded: firestore.FieldValue.serverTimestamp(),
    };
    await this.db.collection(this.collection).doc(docId).set(data);
    const { id, email, firstName, lastName } = data;

    return { id, email, firstName, lastName };
  }

  async get() {
    const query = await this.db.collection(this.collection).get();
    const docs = query.docs.map((doc) => {
      const data = doc.data();
      delete data.password;
      return data;
    });

    return docs;
  }

  async getByEmail(email: string) {
    const query = await this.db
      .collection(this.collection)
      .where("email", "==", email)
      .get();
    if (!query.empty) return query.docs[0].data();
    else return false;
  }

  async getById(id: string) {
    const doc = await this.db.collection(this.collection).doc(id).get();
    const data = doc.data();
    if (data) {
      delete data.password;
      return data;
    } else return false;
  }
}
