import errorApi from "../../service/errorService.js";
import logger from "../../../module/logger/index.js";
import tokenService from "../../service/tokenService.js";
class guard {
    async jwtMiddleware(req, res, next) {
        try {
            const token = req.headers.auth;
            if (!token || typeof token != "string")
                throw errorApi.unauthorized("Нет токена");
            const Payload = await tokenService.validaccessToken(token);
            if (Payload) {
                req.headers.login = Payload.login;
                req.headers.userId = `${Payload.userId}`;
            }
            next();
        }
        catch (err) {
            err instanceof errorApi
                ? res.status(err.status).json(err.message)
                : res.status(500).json("Мой код решил, что сегодня выходной.");
            logger.express.error(err);
        }
    }
}
export default new guard();
//# sourceMappingURL=guard.js.map