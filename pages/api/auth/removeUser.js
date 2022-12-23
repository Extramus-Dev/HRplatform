/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import { SMTPClient } from "emailjs";
import User from "../../../models/user";

export default async (req, res) => {
  await dbConnect();
  try {
    if (req.method === "POST") {
      const { email } = req.body;
      const user = await User.findOne({ email: email });
      if (user) {
        await user.remove();

        const client = new SMTPClient({
          user: process.env.GOOGLE_USER,
          password: process.env.GOOGLE_PASSWORD,
          host: "smtp.gmail.com",
          ssl: true,
        });

        const message = await client.sendAsync({
          text: `Your EXTRAMUS account removed. The reason for deletion of your account may be one of the following:
          - Your request to register was not accepted.
          - Your mission is over.
          If you think there is a mistake, please contact the authorized person.`,
          from: process.env.GOOGLE_USER,
          to: email,
          subject: "EXTRAMUS ACCOUNT REMOVED",
        });

        res.status(200).json({ message: "Remove is Success" });
      } else {
        res.status(422).json({ message: "User is not Exists" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
