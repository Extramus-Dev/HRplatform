import { getMongoDb } from "../../../util/mongodb";
import Student from "../../../models/student";
import Applicant from "../../../models/applicant";
import Intern from "../../../models/intern";
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
      const students = await db
        .collection("students")
        .aggregate([
          {
            $lookup: {
              from: Applicant.collection.name,
              localField: "applicant",
              foreignField: "_id",
              as: "applicant",
            },
          },
          {
            $lookup: {
              from: Intern.collection.name,
              localField: "intern",
              foreignField: "_id",
              as: "intern",
            },
          },
          {
            $unwind: "$applicant",
          },
          {
            $set: {
              dateOfBirth: {
                $dateToString: { format: "%d/%m/%Y", date: "$dateOfBirth" },
              },
              "applicant.startDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.startDate",
                },
              },
              "applicant.applicationDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.applicationDate",
                },
              },
              "applicant.endDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.endDate",
                },
              },
              "applicant.hrInterviewDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.hrInterviewDate",
                },
              },
              "applicant.ceoInterviewDate": {
                $dateToString: {
                  format: "%d/%m/%Y",
                  date: "$applicant.ceoInterviewDate",
                },
              },
            },
          },
        ])
        .toArray();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  if (method === "POST") {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
