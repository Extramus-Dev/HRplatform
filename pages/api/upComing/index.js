import { getMongoDb } from "../../../util/mongodb";
import Applicant from "../../../models/applicant";
import Student from "../../../models/student";
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
          },
          {
            $project: {
              "student.firstName": 1,
              "student.lastName": 1,
              startDate: 1,
              endDate: 1,
              department: 1,
              status: 1,
            },
          },
          {
            $unwind: "$student",
          },
        ])
        .toArray();

      var data = [];
      for (let i = 0; i < intern.length; i++) {
        if (intern[i].status === "Waiting Start Date") {
          data.push({
            name:
              intern[i].student.firstName + " " + intern[i].student.lastName,
            department: intern[i].department,
            action: "Arriving",
            date: intern[i].endDate,
          });
        } else if (intern[i].status === "Ongoing") {
          data.push({
            name:
              intern[i].student.firstName + " " + intern[i].student.lastName,
            department: intern[i].department,
            action: "Departing",
            date: intern[i].endDate,
          });
        }
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const applicant = await Applicant.create(req.body);
      res.status(201).json(applicant);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
