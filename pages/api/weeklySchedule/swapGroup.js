import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";
import { loadingButtonClasses } from "@mui/lab";

dbConnect();

export default async function handler(req, res) {
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

  const db = await getMongoDb();
  await dbConnect();
  if (method === "PUT") {
    try {
      const group1 = await WeeklySchedule.findOne({
        Group: req.body.params.swapGroup1,
      });
      const group2 = await WeeklySchedule.findOne({
        Group: req.body.params.swapGroup2,
      });
      const updateStatus = await WeeklySchedule.updateOne(
        {
          Group: req.body.params.swapGroup1,
        },
        { $set: { Schedule: group2.Schedule } }
      );
      const updateStatus2 = await WeeklySchedule.updateOne(
        {
          Group: req.body.params.swapGroup2,
        },
        { $set: { Schedule: group1.Schedule } }
      );
      res.status(201).json("variables is successfully updated");
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
