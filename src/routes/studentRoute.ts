import { Router } from "express";

//import controller
import { studentController } from "../controllers/studentController";

export class studentRoute {
  student = new studentController();
  public routes(router: Router): Router {
    router.post(
      "/api/addstudent",
      this.student.requireSignin,
      this.student.AddStudent
    );
    return router;
  }
}
