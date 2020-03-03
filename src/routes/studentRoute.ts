import { Router } from "express";

//import controller
import { studentController } from "../controllers/studentController";

export class studentRoute {
  student = new studentController();
  public routes(router: Router): Router {
    router.post(
      "/api/student/add",
      this.student.requireSignin,
      this.student.AddStudent
    );
    router.get(
      "/api/student/all",
      this.student.requireSignin,
      this.student.GetAllStudents
    );
    router.get(
      "/api/student",
      this.student.requireSignin,
      this.student.GetStudent
    );
    router.delete(
      "/api/student",
      this.student.requireSignin,
      this.student.DeleteStudent
    );
    router.put(
      "/api/student",
      this.student.requireSignin,
      this.student.UpdateStudent
    );

    return router;
  }
}
