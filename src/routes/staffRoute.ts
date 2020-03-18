import { Router } from "express";

//import controller
import { authController } from "../controllers/authController";
import { staffController } from "../controllers/staffController";

export class staffRoute {
  staff = new staffController();
  auth = new authController();
  public routes(router: Router): Router {
    router.post("/api/staff/add", this.auth.requireSignin, this.staff.AddStaff);
    router.get(
      "/api/staff/all",
      this.auth.requireSignin,
      this.staff.GetAllStaff
    );
    router.get("/api/staff", this.auth.requireSignin, this.staff.GetStaff);
    router.delete(
      "/api/staff",
      this.auth.requireSignin,
      this.staff.DeleteStaff
    );
    router.put("/api/staff", this.auth.requireSignin, this.staff.UpdateStaff);

    return router;
  }
}
