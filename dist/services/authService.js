"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class authService {
    constructor() {
        this.router = express_1.default.Router();
        this.router.get("/login", this.login);
        this.router.get("/register", this.register);
    }
    login(req, res) {
        res.render("login");
    }
    register(req, res) {
        res.render("register");
    }
}
//# sourceMappingURL=authService.js.map