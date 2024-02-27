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

export const partnersAZ_ZA = async (req, res) => {
    const query = { state: true};
    let sortDirection = 1;

    if (req.query.order === 'desc') {
        sortDirection = -1
    }

    const [quantityPartner, partners] = await Promise.all([
        Partner.countDocuments(query),
        Partner.find(query).sort({ partnerName: sortDirection})
    ])

    res.status(200).json({
        msg: "Partners ordered according to requirements",
        quantityPartner,
        partners
    });
}


