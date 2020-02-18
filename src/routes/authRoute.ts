import { Router } from "express";

//import controller
import { authController } from "../controllers/authController";

export class authRoute {
  auth = new authController();
  public routes(router: Router): Router {
    router.post("/api/register", this.auth.Register);
    router.post("/api/login", this.auth.Login);
    return router;
  }
}
