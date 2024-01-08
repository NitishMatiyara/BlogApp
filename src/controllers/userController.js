import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register
const register = async (req, res) => {
  try {
    const { name, email, password } = req?.body;
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res
        .status(401)
        .send({ message: "User already present with this email" });

    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .send({ message: "User registration failed", error: error });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req?.body;
    const userData = await User.findOne({ email });

    if (userData === null)
      return res.status(400).send({ message: "invalid email or password" });

    const token = jwt.sign(userData.toJSON(), process.env.JWT_SECRET_KEY);

    bcrypt.compare(password, userData.password, function (err, result) {
      if (err) throw err;
      if (result) {
        return res.status(200).send({
          message: "User fetched successfully",
          authToken: token,
        });
      } else {
        return res.status(400).send({ message: "invalid credentials" });
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

//Logout
const logout = (req, res) => {
  try {
  } catch (error) {}
};

export default { register, login, logout };
