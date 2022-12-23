import { getMongoDb } from "../../../util/mongodb";
import WeeklySchedule from "../../../models/weeklySchedule";
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
      const weeklySchedule = await WeeklySchedule.find({});
      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "POST") {
    try {
      const weeklySchedule = await WeeklySchedule.create(req.body);
      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }
  if (method === "PUT") {
    try {
      const weeklySchedule = await WeeklySchedule.updateOne(
        {
          Group: req.body.params.scheduleGroup.Group,
        },
        {
          $set: {
            Group: req.body.params.scheduleGroup.Group,
            Schedule: {
              monday: {
                startTime:
                  req.body.params.scheduleGroup.Schedule.monday.startTime,
                endTime: req.body.params.scheduleGroup.Schedule.monday.endTime,
              },
              tuesday: {
                startTime:
                  req.body.params.scheduleGroup.Schedule.tuesday.startTime,
                endTime: req.body.params.scheduleGroup.Schedule.tuesday.endTime,
              },
              wednesday: {
                startTime:
                  req.body.params.scheduleGroup.Schedule.wednesday.startTime,
                endTime:
                  req.body.params.scheduleGroup.Schedule.wednesday.endTime,
              },
              thursday: {
                startTime:
                  req.body.params.scheduleGroup.Schedule.thursday.startTime,
                endTime:
                  req.body.params.scheduleGroup.Schedule.thursday.endTime,
              },
              friday: {
                startTime:
                  req.body.params.scheduleGroup.Schedule.friday.startTime,
                endTime: req.body.params.scheduleGroup.Schedule.friday.endTime,
              },
            },
          },
        }
      );

      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "DELETE") {
    try {
      const weeklySchedule = await WeeklySchedule.deleteOne({
        Group: req.query.Group,
      });

      res.status(201).json(weeklySchedule);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
