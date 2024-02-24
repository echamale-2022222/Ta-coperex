import { Router } from "express";
import { check } from "express-validator";
import { companiesAZ_ZA, companyPost, excelCompanies, registeredCompanies, updateCompany, years } from "./company.controller.js";
import { validateFields } from "../middlewares/validate-fields.js" 


const router = Router();

router.post(
    "/",
    [
        check("companyName", "The company name cannot be empty").not().isEmpty(),
        check("impactLevel", "The impact of the company cannot be empty").not().isEmpty(),
        check("yearsOfExperience", "The years of experience cannot be empty").not().isEmpty(),
        check("businessCategory", "The business category cannot be empty").not().isEmpty(),
        validateFields,
    ], companyPost);

router.get("/companies", registeredCompanies);

router.get("/excel", excelCompanies);

router.get("/orderCompanies", companiesAZ_ZA);

router.get("/yearsExperience", years);

router.put(
    "/:id",
    [
        check("id", "It is not a valid id").isMongoId(),
        validateFields   
    ], updateCompany)

export default router;