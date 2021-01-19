import express from "express";
import firebase from "firebase-admin";
import UsersService from "../services/users";
import EventsService from "../services/events";

export interface AppDependencies {
  admin: firebase.app.App;
  db?: FirebaseFirestore.Firestore;
  usersService?: UsersService;
  eventsService?: EventsService;
}

export default function (app: express.Application, services: AppDependencies) {
  // assign default services, but allow overriding
  const db = services.db || services.admin.firestore();
  const usersService = services.usersService || new UsersService(db);
  const eventsService = services.eventsService || new EventsService(db);

  // attach dependencies to the express app
  app.set("admin", services.admin);
  app.set("db", db);
  app.set("usersService", usersService);
  app.set("eventsService", eventsService);
}
