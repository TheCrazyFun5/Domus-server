import JWT from "jsonwebtoken";
import configLoader from "../../module/configLoader/index.js";
class TokenService {
  createdToken(userId: number, login: string) {
    const accessToken = JWT.sign({ userId: userId, login: login }, configLoader.main.config!.JWT.secretKey, {
      expiresIn: "15m",
    });
    const refreshToken = JWT.sign({ userId: userId }, configLoader.main.config!.JWT.secretKey, {
      expiresIn: "2d",
    });
    return { accessToken, refreshToken };
  }
}

export default new TokenService();
