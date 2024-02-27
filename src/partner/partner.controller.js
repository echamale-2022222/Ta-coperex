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

export const registeredPartners = async (req, res) => {
    const query = { state: true };

    const [quantityPartner, partners] = await Promise.all([
        Partner.countDocuments(query),
        Partner.find(query)
    ]);

    res.status(200).json({
        msg: "Registered partners",
        quantityPartner,
        partners
    });
}
