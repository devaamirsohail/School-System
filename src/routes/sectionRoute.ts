import { Router } from "express";

//import controller
import { sectionController } from "../controllers/sectionController";
import { authController } from "../controllers/authController";

export class sectionRoute {
  section = new sectionController();
  auth = new authController();

  public routes(router: Router): Router {
    router.post(
      "/api/section/add",
      this.auth.requireSignin,
      this.section.AddSection
    );
    router.put(
      "/api/section",
      this.auth.requireSignin,
      this.section.UpdateSection
    );
    router.get(
      "/api/section/all",
      this.auth.requireSignin,
      this.section.GetAllSections
    );
    router.get(
      "/api/section",
      this.auth.requireSignin,
      this.section.GetSection
    );
    router.delete(
      "/api/section",
      this.auth.requireSignin,
      this.section.DeleteSection
    );

    return router;
  }
}
