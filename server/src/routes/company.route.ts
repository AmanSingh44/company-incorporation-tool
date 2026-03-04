import { Router } from "express";
import { addShareholdersHandler, createCompanyHandler, getCompaniesHandler, getCompanyHandler } from "../controllers/company.controller.js";
import { companyValidator, shareholdersValidator } from "../middlewares/validator.js";
import { adminOnly } from "../middlewares/admin.js";
import { ADMIN_KEY } from "../constants/env.js";
import { OK, UNAUTHORIZED } from "../constants/http.js";

const routes=Router()

routes.post("/company",companyValidator, createCompanyHandler)
routes.post("/:companyId/shareholders",shareholdersValidator,addShareholdersHandler)

routes.get("/company",adminOnly,getCompaniesHandler)
routes.get("/:companyId",getCompanyHandler)

routes.post("/verify-admin", (req, res) => {
  const { adminKey } = req.body;

  if (adminKey !== ADMIN_KEY) {
    return res.status(UNAUTHORIZED).json({ message: "Invalid admin key" });
  }

  return res.status(OK).json({ message: "Valid admin key" });
});

export default routes