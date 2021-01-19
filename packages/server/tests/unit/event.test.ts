import { Event, EventI } from "../../src/models/event";

describe("Event", () => {
  const event: EventI = {
    title: "Event Title",
    date: new Date(),
    location: "Location",
    owner: "ownerId",
    costInCents: 1234,
  };

  it("should make a Event object", () => {
    const data = new Event(event);

    expect(data).toBeDefined();
  });

  it("should return validate `true` a valid schema", () => {
    const { error } = Event.validate(event);

    expect(error).toBe(undefined);
  });

  it("should return validate `false` an invalid schema", () => {
    const data = { ...event };
    delete data.title;

    const { error } = Event.validate(data);

    expect(error).toBeDefined();
    expect(error.message.includes("title")).toBe(true);
  });
});
