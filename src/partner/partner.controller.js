import { request } from "express";
import Partner from "./partner.model.js";

export const partnerPost = async (req, res) => {
    const { partnerName, activitySector, companyImpactLevel, yearsOfCompanyExperience, businessCategoryOfTheCompany } = req.body;
    const partner = new Partner({ partnerName, activitySector, companyImpactLevel, yearsOfCompanyExperience, businessCategoryOfTheCompany });

    await partner.save();

    res.status(200).json({
        msg: "Partner added to database",
        partner
    });
}

