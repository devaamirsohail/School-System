import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
// import Config from "./config";
// Routes
import routes from "./routes";

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private initRoutes(): void {
    routes.forEach(route => {
      new route().routes(this.app);
    });
  }
}

export default new App().app;
