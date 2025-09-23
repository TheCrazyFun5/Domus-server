export default class errorApi extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
    }
    static badRequest(message) {
        return new errorApi(400, message);
    }
    static unauthorized(message) {
        return new errorApi(401, message);
    }
}
//# sourceMappingURL=errorService.js.map