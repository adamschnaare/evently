import * as Joi from "joi";

export interface EventI {
  id?: string;
  title: string;
  date: Date;
  location: string;
  attendees?: string[];
  owner: string;
  costInCents: number;
  details?: string;
}

export class Event {
  constructor(public user: EventI) {}

  // Joi validation schema
  static schema = Joi.object({
    id: Joi.string(),
    title: Joi.string().required(),
    date: Joi.date().required(),
    location: Joi.string().required(),
    attendees: Joi.array().items(Joi.string()),
    owner: Joi.string().required(),
    costInCents: Joi.number().required(),
    details: Joi.string(),
  });

  static validate(event: any) {
    return Event.schema.validate(event);
  }
}
