import * as express from "express";
import EventsService from "../services/events";
import auth from "../middleware/auth";

const router = express.Router();
// const collection = "events";

// get all users
router.get("/", auth, async (req, res) => {
  const eventsService: EventsService = req.app.get("eventsService");

  try {
    const docs = await eventsService.get();
    res.status(200).send(docs);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
