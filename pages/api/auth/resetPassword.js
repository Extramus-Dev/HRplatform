/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";

export default async (req, res) => {
  await dbConnect();
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(422).json({ message: "User not Exists" });
      } else {
        const secret = parseInt(process.env.JWT_SECRET);
        const HashedPassword = await bcrypt.hash(password, secret);
        user.password = HashedPassword;
        await user.save();
        res.status(200).json({ message: "Update is Success" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
