import * as express from "express";
import * as bodyParser from "body-parser";
import Config from "./config";
// Routes
import routes from "./routes";

class App {
  public app: express.Application;
  private config = new Config();
  constructor() {
    this.app = express();
    this.config.loadConfiguration();
    this.initMiddlewares();
    this.initRoutes();
  }

  private initMiddlewares(): void {
    //Middlewares
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private initRoutes(): void {
    routes.forEach(route => {
      new route().routes(this.app);
    });
  }
}

export default new App().app;
