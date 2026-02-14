import { Model } from "mongoose";
import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import { User } from "../Models/User.model.js";
import { randomBytes } from "crypto";

const login = async (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !password) return;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      let token = randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      return res.status(httpStatus.CREATED).json({ token: token });
    }
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;

  try {
    const existinguser = await User.findOne({ username });

    if (existinguser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "user already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newuser.save();
    return res.status(httpStatus.CREATED).json({ message: "User created" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

export {login,register}