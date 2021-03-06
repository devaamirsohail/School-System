import { Router } from "express";

//import controller
import { studentController } from "../controllers/studentController";
import { authController } from "../controllers/authController";

export class studentRoute {
  student = new studentController();
  auth = new authController();

  public routes(router: Router): Router {
    router.post(
      "/api/student/add",
      this.auth.requireSignin,
      this.student.AddStudent
    );
    router.get(
      "/api/student/all",
      this.auth.requireSignin,
      this.student.GetAllStudents
    );
    router.get(
      "/api/student",
      this.auth.requireSignin,
      this.student.GetStudent
    );
    router.delete(
      "/api/student",
      this.auth.requireSignin,
      this.student.DeleteStudent
    );
    router.put(
      "/api/student",
      this.auth.requireSignin,
      this.student.UpdateStudent
    );

    return router;
  }
}
