import { getMongoDb } from "../../../util/mongodb";
import Student from "../../../models/student";
import Applicant from "../../../models/applicant";
import Intern from "../../../models/intern";
import dbConnect from "../../../util/mongodb";

export default async function handler(req, res){
    const { method } = req;
    const db = await getMongoDb();
    await dbConnect();

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
            $lookup: {
              from: Intern.collection.name,
              localField: "intern",
              foreignField: "_id",
              as: "intern",
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
