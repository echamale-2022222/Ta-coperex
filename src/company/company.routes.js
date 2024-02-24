import { Router } from "express";
import { check } from "express-validator";
import { category, companiesAZ_ZA, companyPost, excelCompanies, registeredCompanies, updateCompany, years } from "./company.controller.js";
import { validateFields } from "../middlewares/validate-fields.js" 
import { validateJWT } from "../middlewares/validate-jwt.js"

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("companyName", "The company name cannot be empty").not().isEmpty(),
        check("impactLevel", "The impact of the company cannot be empty").not().isEmpty(),
        check("yearsOfExperience", "The years of experience cannot be empty").not().isEmpty(),
        check("businessCategory", "The business category cannot be empty").not().isEmpty(),
        validateFields,
    ], companyPost);

router.get("/companies",
    validateJWT,    
    registeredCompanies);

router.get("/excel", 
    validateJWT,
    excelCompanies);

router.get("/filterCategory", 
    validateJWT,
    category);

router.get("/orderCompanies",
    validateJWT,
    companiesAZ_ZA);

router.get("/yearsExperience",
    validateJWT,
    years);

router.put(
    "/:id",
    [
        validateJWT,
        check("id", "It is not a valid id ").isMongoId(),
        validateFields   
    ], updateCompany)

export default router;