"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = __importDefault(require("express-handlebars"));
const morgan_1 = __importDefault(require("morgan"));
const index_routes_1 = __importDefault(require("./routes/index-routes"));
class Application {
    constructor() {
        this.app = express_1.default();
        this.settings();
        this.routes();
        this.middleware();
    }
    settings() {
        this.app.set("PORT", process.env.PORT || 4545);
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.engine("hbs", express_handlebars_1.default({
            layoutsDir: path_1.default.join(this.app.get("views"), "layouts"),
            partialsDir: path_1.default.join(this.app.get("views"), "partials"),
            defaultLayout: "main",
            extname: ".hbs"
        }));
        this.app.set("view engine", ".hbs");
    }
    routes() {
        this.app.use(index_routes_1.default);
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
    }
    middleware() {
        this.app.use(morgan_1.default("dev"));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    start() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log(`listening to port §§ ${this.app.get("PORT")} §§`);
        });
    }
}
exports.default = Application;
