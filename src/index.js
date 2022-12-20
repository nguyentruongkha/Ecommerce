import "./config/config.js";
import express from "express";
import mongoose from "mongoose";
import { router as authRouter } from "../src/routes/auth.route.js";
import { router as userRouter } from "../src/routes/user.js";
import { router as productRouter } from "../src/routes/product.js";
import { router as cartRouter } from "../src/routes/cart.js";
import { router as orderRouter } from "../src/routes/oder.js";
import passsport from "passport";
import { jwtStrategy } from "../src/config/passport.js";

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => console.log(err));

const app = express();

app.use(passsport.initialize());
passsport.use("jwt", jwtStrategy);
app.use(express.json());
app.use(authRouter);
app.use(userRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(orderRouter);

app.listen(process.env.PORT, () => {
  console.log("Backend sever is running");
});

console.log(process.env.PORT);
