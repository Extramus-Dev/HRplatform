/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../util/mongodb";
import User from "../../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  await dbConnect();
  try {
    if (req.method === "POST") {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(422).json({ message: "User Doesn't Exists" });
      } else {
        if (password === "" || password.length == 0) {
          res.status(400).json({ message: "Password is Required" });
        } else {
          const doMatch = await bcrypt.compare(password, user.password);
          if (!doMatch) {
            res.status(404).json({ message: "Password Doesn't Match" });
          } else {
            if (user.confirmation === "0") {
              res.status(404).json({
                message:
                  "Your account is not yet approved by Extramus. Please get contact with an Authorized person to approve your registration.",
              });
            } else {
              const token = jwt.sign(
                { userId: user.id },
                process.env.JWT_SECRET,
                {
                  expiresIn: "7d",
                }
              );
              const { email, _id } = user;
              res.status(201).json({
                message: "Login Successful",
                user: { email, _id },
                token,
              });
            }
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
