import * as express from "express";
import { firestore } from "firebase-admin";
import { User } from "../models/user";
import UsersService from "../services/users";
import auth from "../middleware/auth";

const router = express.Router();
const collection = "users";

// get all users
router.get("/", auth, async (req, res) => {
  const usersService: UsersService = req.app.get("usersService");

  try {
    const docs = await usersService.get();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/me", auth, async (req, res) => {
  const usersService: UsersService = req.app.get("usersService");
  const { id } = req.app.get("user");

  try {
    const user = await usersService.getById(id);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

// create new user
router.post("/", async (req, res) => {
  const usersService: UsersService = req.app.get("usersService");

  // validate
  const { error } = User.schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // verify uniqueness
  const user = await usersService.getByEmail(req.body.email);
  if (user) return res.status(400).send("User already exists");

  // process
  try {
    const resp = await usersService.create(req.body);
    const token = User.generateAuthToken(req.body);
    const data = { ...resp, token };

    return res.status(201).send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Delete a user
router.delete("/:id", auth, async (req, res) => {
  const db: firestore.Firestore = req.app.get("db");
  const { id } = req.params;

  try {
    await db.collection(collection).doc(id).delete();

    res.status(204).send("Document successfully deleted!");
  } catch (error) {
    res.status(500).send(error);
  }
});

//get a single contact
// router.get("/users/:userId", async (req, res) => {
//   const db: firestore.Firestore = req.app.get("db");
//   const userId = req.params.userId;

//   try {
//     const user = await db.collection(collection).doc(userId).get();
//     if (!user.exists) throw new Error("User not found");

//     res.status(200).json({ id: user.id, data: user.data() });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // Update user
// router.put("/users/:userId", async (req, res) => {
//   const db: firestore.Firestore = req.app.get("db");

//   try {
//     await db
//       .collection(collection)
//       .doc(req.params.userId)
//       .set(req.body, { merge: true });

//     res.json({ id: req.params.userId });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

export default router;
