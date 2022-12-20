import tokenService from "../services/token.service.js";
import User from "../models/User.js";

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = tokenService.verifyToken(refreshToken);
    const user = await User.findById(refreshTokenDoc.user);
    if (!user) {
      throw new Error(); // TODO: throw error them message
    }
    await refreshTokenDoc.remove();
    // Co chay duoc khong
    return tokenService.generateRefreshToken(user);
  } catch (error) {
    console.log(error); // TODO: Response thay vi log
  }
};

export { refreshAuth };
