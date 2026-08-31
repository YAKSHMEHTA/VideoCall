import httpStatus from "http-status";
import bcrypt from "bcrypt";
import { User } from "../Models/User.model.js";
import { secretService } from "../SecretToken.js";
import { randomBytes } from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "username and password are required" });
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log("no user");
      return res.json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      let token = randomBytes(20).toString("hex");
      user.token = token;
      await user.save();
      const accessToken = secretService(
        user.id,
        process.env.ACCESS_TOKEN_SECRET,
      );
      console.log("loggedIn", user.id);
      res.cookie("accessToken", accessToken, { httpOnly: true });
      return res.status(httpStatus.CREATED).json({ token:token,msg:"loggedIn" });
    } else {
      console.log("wrong password");
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }
  } catch (e) {
    console.log("error",e);
    res.json({ message: `Something went wrong ${e}` });
  }
};

const register = async (req, res) => {
  const { name, username, password } = req.body;
  console.log(name, username);
  if (!name || !username || !password)
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ message: "name, username and password are required" });
  try {
    const existinguser = await User.findOne({ username });

    if (existinguser) {
      console.log("existinguser");
      return res
        .status(httpStatus.FOUND)
        .json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newuser.save();
    console.log(newuser);
    return res.status(httpStatus.CREATED).json({ msg: "User created" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e}` });
  }
};

export { login, register };
