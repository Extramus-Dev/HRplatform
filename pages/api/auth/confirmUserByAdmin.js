/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import { SMTPClient } from "emailjs";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await dbConnect();
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        user.confirmation = "1";
        await user.save();

        const client = new SMTPClient({
          user: process.env.GOOGLE_USER,
          password: process.env.GOOGLE_PASSWORD,
          host: "smtp.gmail.com",
          ssl: true,
        });

        const message = await client.sendAsync({
          text: `Your EXTRAMUS registration approved successfully. You can now login...`,
          from: process.env.GOOGLE_USER,
          to: email,
          subject: "EXTRAMUS REGİSTRATİON",
        });

        res.status(200).json({ message: "Confirmation is Success" });
      } else {
        res.status(422).json({ message: "User is not Exists" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
