import User from "../models/User.js";
import CryptoJS from "crypto-js";
import tokenService from "./token.service.js";
import Emailservice from "./email.service.js";

// leak memory
const refreshTokens = {};
// FIXME: This is for auth service
const Register = async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(401).json("Wrong Email!");

    const hash = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const Originalpassword = hash.toString(CryptoJS.enc.Utf8);

    if (Originalpassword !== req.body.password)
      return res.status(401).json("Wrong password");

    const accessToken = await tokenService.generateToken(user);
    const refreshToken = await tokenService.generateRefreshToken(user);

    const { password, ...others } = user._doc;
    const response = {
      ...others,
      accessToken,
      refreshToken,
    };
    refreshTokens[refreshToken] = user;
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateToken = async (req, res) => {
  try {
    // verify refresh token by jwt.verify
    const { refreshToken } = req.body;
    if (refreshToken && refreshToken in refreshTokens) {
      const user = refreshTokens[refreshToken];
      const token = await tokenService.generateRefreshToken(user);

      res.status(200).send({ user, token: token });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const token = await tokenService.generateRefreshToken(user);
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
      await Emailservice.forgotPassword(user.email, token);
    }
    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(update);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndRemove(req.params.id);
    res.status(200).json(deleteUser);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const UserService = {
  Register,
  Login,
  updateToken,
  updateUser,
  deleteUser,
  getAllUser,
};

export default UserService;
