import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";

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
  if (method === "POST") {
    try {
      const weeklySchedule = await WeeklySchedule.updateOne(
        {
          Interns: { $ne: req.body.params.internId },
          Group: req.body.params.Group,
        },
        { $set: { Interns: req.body.params.internId } }
      );

      if (weeklySchedule.modifiedCount === 1) {
        console.log("Intern Added");
        res.status(201).json("Intern Added");
      } else {
        res
          .status(409)
          .json(
            "Error encountered. The reasons could be one of the following. - Wrong group name, Already attached intern"
          );
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      //ADD PROCESS
      const addProcess = await WeeklySchedule.updateOne(
        {
          Interns: { $ne: req.body.params.internId },
          Group: req.body.params.Group,
        },
        { $set: { Interns: req.body.params.internId } }
      );
      //ADD PROCESS
      //REMOVE PROCESS
      var removeProcess;
      if (addProcess.modifiedCount === 1) {
        removeProcess = await WeeklySchedule.updateOne(
          {
            Interns: req.body.params.internId,
            Group: { $ne: req.body.params.Group },
          },
          { $pull: { Interns: req.body.params.internId } }
        );
      }
      //REMOVE PROCESS
      
      if (removeProcess.modifiedCount === 1 && addProcess.modifiedCount === 1) {
        res.status(201).json("Intern Added");
      } else {
        res
          .status(409)
          .json(
            "Error encountered. The reasons could be one of the following. previously unattended intern, Wrong group name."
          );
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
