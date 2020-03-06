import { Router } from "express";

//import controller
import { classController } from "../controllers/classController";
import { authController } from "../controllers/authController";

export class classRoute {
  class = new classController();
  auth = new authController();

  public routes(router: Router): Router {
    router.post("/api/class/add", this.auth.requireSignin, this.class.AddClass);
    router.get(
      "/api/class/all",
      this.auth.requireSignin,
      this.class.GetAllClasses
    );
    router.get("/api/class", this.auth.requireSignin, this.class.GetClass);
    router.delete(
      "/api/class",
      this.auth.requireSignin,
      this.class.DeleteClass
    );
    router.put("/api/class", this.auth.requireSignin, this.class.UpdateClass);

    return router;
  }
}
