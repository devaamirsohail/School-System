import { Router } from "express";

//import controller
import { subjectController } from "../controllers/subjectController";
import { authController } from "../controllers/authController";

export class subjectRoute {
  subject = new subjectController();
  auth = new authController();

  public routes(router: Router): Router {
    router.post(
      "/api/subject/add",
      this.auth.requireSignin,
      this.subject.AddSubject
    );
    router.get(
      "/api/subject/all",
      this.auth.requireSignin,
      this.subject.GetAllSubjects
    );
    router.get(
      "/api/subject",
      this.auth.requireSignin,
      this.subject.GetSubject
    );
    router.delete(
      "/api/subject",
      this.auth.requireSignin,
      this.subject.DeleteSubject
    );

    return router;
  }
}
