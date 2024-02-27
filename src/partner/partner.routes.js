import { Router } from "express";
import { check } from "express-validator";
import { excelPartners, partnerPost, partnersAZ_ZA, registeredPartners, updatePartner, years } from "./partner.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validateJWT,
        check("partnerName", "The partner name cannot be empty").not().isEmpty(),
        check("companyName", "The company name cannot be empty").not().isEmpty(),
        check("activitySector", "The activity of the sector cannot be empty").not().isEmpty(),
        check("companyImpactLevel", "The company impact level cannot be empty").not().isEmpty(),
        check("yearsOfCompanyExperience", "The years of experience of the company are mandatory").not().isEmpty(),
        check("businessCategoryOfTheCompany", "The company's business category cannot be empty").not().isEmpty(),
        validateFields,
    ], partnerPost);

router.get(
    "/", 
    validateJWT, 
    registeredPartners);

router.get(
    "/orderPartners",
    validateJWT,
    partnersAZ_ZA)

router.get(
    "/year",
    validateJWT,
    years)

router.put(
    "/:id",
    validateJWT,
    check("id", "It is not a valid id").isMongoId(),
    validateFields,
    updatePartner)

router.get(
    "/excelPartner",
    validateJWT,
    excelPartners)

export default router;