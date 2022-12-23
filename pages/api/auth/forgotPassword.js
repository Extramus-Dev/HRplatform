// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SMTPClient } from "emailjs";
import dbConnect from "../../../util/mongodb";
import User from "../../../models/user";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  await dbConnect();
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (req.method === "POST") {
      if (!user) {
        res.status(422).json({ message: "User does not Exists" });
      } else {
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        const client = new SMTPClient({
          user: process.env.GOOGLE_USER,
          password: process.env.GOOGLE_PASSWORD,
          host: "smtp.gmail.com",
          ssl: true,
        });

        const message = await client.sendAsync({
          text: `its For Change your password : ${process.env.NEXTAUTH_URL}/login/resetPassword/${token}`,
          from: process.env.GOOGLE_USER,
          to: email,
          subject: "testing Change Password ",
        });

        res.status(200).end(JSON.stringify({ message: "Send Mail" }));
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).end(JSON.stringify({ message: "Error" }));
    return;
  }
}
