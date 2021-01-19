import * as Joi from "joi";
import { Event, EventI } from "./event";
import { firestore } from "firebase-admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

export interface UserI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  id?: string;
  dateAdded?: firestore.FieldValue;
  totalCostInCents?: number;
  events?: EventI[];
}

export class User {
  constructor(public user: UserI) {}

  // Joi validation schema
  static schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    id: Joi.string(),
    dateAdded: Joi.string(),
    totalCostInCents: Joi.number(),
    events: Joi.array().items(Event.schema),
  });

  static validate(user: any) {
    return User.schema.validate(user);
  }

  static async generateHashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  }

  static generateAuthToken(user: any) {
    const payload = { id: user.id };
    const jwtPrivateKey = config.get("jwtPrivateKey") as string;
    const token = jwt.sign(payload, jwtPrivateKey);

    return token;
  }

  fullName() {
    return `${this.user.firstName} ${this.user.lastName}`;
  }
}
