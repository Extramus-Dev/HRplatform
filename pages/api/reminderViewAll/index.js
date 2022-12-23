import { getMongoDb } from "../../../util/mongodb";
import Reminder from "../../../models/reminder";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";
export default async function handler(req, res) {
  const { method } = req;
  const db = await getMongoDb();
  await dbConnect();
  // Token CHECK
  let token = req.query.token
    ? req.query.token
    : req.body.token
    ? req.body.token
    : "";
  try {
    tokenCheckFunction(token);
  } catch (e) {
    console.error(e);
    res.status(401).json("Unauthorized User");
  }
  // Token CHECK

  if (method === "GET") {
    try {
      const reminder = await Reminder.find({});
      res.status(201).json(reminder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const reminder = await Reminder.create(req.body);
      res.status(201).json(reminder);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
