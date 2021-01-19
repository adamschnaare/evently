import * as express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import UsersService from "../services/users";
import { User } from "../models/user";

const router = express.Router();

// login
router.post("/", async (req, res) => {
  const usersService: UsersService = req.app.get("usersService");

  // validate
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // verify uniqueness
  const user = await usersService.getByEmail(req.body.email);
  if (!user) return res.status(400).send("Invalid email or password");

  // validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = User.generateAuthToken(user);
  delete user.password;

  return res.send({ ...user, token });
});

function validate(reqBody: any) {
  // Joi validation schema
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate(reqBody);
}

export default router;
