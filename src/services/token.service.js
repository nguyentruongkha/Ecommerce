import jwt from "jsonwebtoken";

const generateToken = async (user) => {
  const accessToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "1m",
    }
  );
  return accessToken;
};

const generateRefreshToken = async (user) => {
  const refreshToken = jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_ACCESS_TOKEN, // FIXME: Refresh token
    { expiresIn: "3d" }
  );
  return refreshToken;
};

const verifyToken = (req, res) => {
  try {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
        if (err) return res.status(403).send("FAIL!");
        req.user = user;
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const tokenService = { generateToken, generateRefreshToken, verifyToken };

export default tokenService;
