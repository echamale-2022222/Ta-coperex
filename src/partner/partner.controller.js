import { request } from "express";
import Partner from "./partner.model.js";
import Excel from 'exceljs'

export const partnerPost = async (req, res) => {
    const { partnerName, companyName, activitySector, companyImpactLevel, yearsOfCompanyExperience, businessCategoryOfTheCompany } = req.body;
    const partner = new Partner({ partnerName, companyName, activitySector, companyImpactLevel, yearsOfCompanyExperience, businessCategoryOfTheCompany });

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
        Partner.find(query).sort({ companyName: sortDirection})
    ])

    res.status(200).json({
        msg: "Partners ordered according to requirements",
        quantityPartner,
        partners
    });
}

export const years = async (req, res) => {
    const query = { state: true };
    let sortDirection = 1;
    let filterYears = {};

    if (req.query.years) {
        const years = parseInt(req.query.years);
        filterYears = { yearsOfCompanyExperience: years};
    }

    if (req.query.order === 'desc') {
        sortDirection = -1;
    }

    const [quantityPartner, partners] = await Promise.all([
        Partner.countDocuments({...query, ...filterYears}),
        Partner.find({...query, ...filterYears}).sort({ companyName: sortDirection})
    ]);

    res.status(200).json({
        msg: "Partners that match",
        quantityPartner,
        partners
    });
}

export const updatePartner = async (req, res = response) => {
    const { id } = req.params;
    const {_id, partnerName, companyName, state, ...rest} = req.body;

    await Partner.findByIdAndUpdate(id, rest);

    const partner = await Partner.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated partner',
        partner
    });
}

export const excelPartners = async(req, res) => {
    const query = { state: true };

    try {
        const partners = await Partner.find(query);

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Partners');

        worksheet.addRow(['Nombre del socio', 'Nombre de la empresa', 'Sector de actividad', 'Nivel de impacto de la empresa', 'Años de experiencia', 'Categoria empresarial de la empresa']);

        partners.forEach(partner => {
            worksheet.addRow([
                partner.partnerName,
                partner.companyName,
                partner.activitySector,
                partner.companyImpactLevel,
                partner.yearsOfCompanyExperience,
                partner.businessCategoryOfTheCompany
            ]);
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="partners.xlsx"');

        res.status(200).send(buffer);
    } catch (error) {
        console.error('Error when exporting partners to Excel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
