import passport from "passport";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
      if (err) return res.status(403).json("Token not found!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifiAdmin = (req, res, next) => {
  passport.authenticate(
    "jwt",
    { session: false },
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.send("You aer not allow!");
      }
    })
  );
};

const verifyUser = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, verifyToken(req, res, next));
};

const auth = { verifyUser, verifiAdmin };

export default auth;
