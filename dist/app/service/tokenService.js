import JWT from "jsonwebtoken";
import configLoader from "../../module/configLoader/index.js";
import errorApi from "./errorService.js";
class TokenService {
    async createdToken(userId, login) {
        const accessToken = JWT.sign({ userId: userId, login: login }, configLoader.main.config.JWT.accessSecretKey, {
            expiresIn: "15m",
        });
        const refreshToken = JWT.sign({ userId: userId, login: login }, configLoader.main.config.JWT.refreshSecretKey, {
            expiresIn: "2d",
        });
        return { accessToken, refreshToken };
    }
    async validRefreshToken(token) {
        try {
            let verifyToken = JWT.verify(token, configLoader.main.config.JWT.refreshSecretKey);
            return verifyToken;
        }
        catch (err) {
            throw errorApi.unauthorized("Токен недействительный");
        }
    }
    async validaccessToken(token) {
        try {
            let verifyToken = JWT.verify(token, configLoader.main.config.JWT.accessSecretKey);
            return verifyToken;
        }
        catch (err) {
            throw errorApi.unauthorized("Токен недействительный");
        }
    }
}
export default new TokenService();
//# sourceMappingURL=tokenService.js.map