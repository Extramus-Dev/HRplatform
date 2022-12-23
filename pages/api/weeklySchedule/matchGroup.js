import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

export default async function handler(req, res) {
  const db = await getMongoDb();
  await dbConnect();
  const { method } = req;
  //    // Token CHECK
  //    let token = req.query.token
  //    ? req.query.token
  //    : req.body.token
  //    ? req.body.token
  //    : "";
  //  try {
  //    tokenCheckFunction(token);
  //  } catch (e) {
  //    console.error(e);
  //    res.status(401).json("Unauthorized User");
  //  }
  //  // Token CHECK

  if (method === "GET") {
    try {
      const weeklySchedule = await WeeklySchedule.findOne({
        Group: req.query.Group,
      });
      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
