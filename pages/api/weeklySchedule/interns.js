import { getMongoDb } from "../../../util/mongodb";
import Intern from "../../../models/intern";
import Student from "../../../models/student";
import dbConnect from "../../../util/mongodb";
import { tokenCheckFunction } from "../auth/tokenCheck";
import weeklySchedule from "../../../models/weeklySchedule";

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

  if (method === "GET") {
    try {
      const intern = await db
        .collection("interns")
        .aggregate([
          {
            $lookup: {
              from: Student.collection.name,
              // pipeline: [{ $match: { applicationStatus: "On Process" } }],
              localField: "student",
              foreignField: "_id",

              as: "student",
            },
            $lookup: {
              from: weeklySchedule.collection.name,
              // pipeline: [{ $match: { applicationStatus: "On Process" } }],
              localField: "group",
              foreignField: "_id",
              as: "weeklySchedule",
            },
          },
          {
            $project: {
              "student.firstName": 1,
              "student.lastName": 1,
              "group.Group": 1,
              group: 1,
              status: 1,
            },
          },
          {
            $unwind: "$student",
          },
        ])
        .toArray();
      //   const student = await Student.findOne({
      //     firstName: req.query.firstName,
      //     lastName: req.query.lastName,
      //     $or: [
      //       { applicationStatus: "Accepted" },// When App fixed it should be only On Process
      //       { applicationStatus: "On Process" },
      //     ],
      //   });
      //   if (!student) {
      //     res.status(422).json({ message: "Intern not Exists" });
      //   } else if (typeof student.intern === `undefined`) {
      //     res.status(422).json({
      //       message: "The student has not yet been accepted to be intern.",
      //     });
      //   } else {
      //     res.status(201).json(student.intern);
      //   }
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
