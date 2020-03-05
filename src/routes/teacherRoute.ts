import { Router } from "express";

//import controller
import { authController } from "../controllers/authController";
import { teacherController } from "../controllers/teacherController";

export class teacherRoute {
  teacher = new teacherController();
  auth = new authController();
  public routes(router: Router): Router {
    router.post(
      "/api/teacher/add",
      this.auth.requireSignin,
      this.teacher.AddTeacher
    );
    router.get(
      "/api/teacher/all",
      this.auth.requireSignin,
      this.teacher.GetAllTeachers
    );
    router.get(
      "/api/teacher",
      this.auth.requireSignin,
      this.teacher.GetTeacher
    );
    router.delete(
      "/api/teacher",
      this.auth.requireSignin,
      this.teacher.DeleteTeacher
    );
    router.put(
      "/api/teacher",
      this.auth.requireSignin,
      this.teacher.UpdateTeacher
    );

    return router;
  }
}
