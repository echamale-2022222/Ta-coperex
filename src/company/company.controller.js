import { request, response } from "express";
import Company from "./company.model.js";
import Excel from "exceljs"

export const companyPost = async (req, res) => {
    const { companyName, impactLevel, yearsOfExperience, businessCategory } = req.body;
    const company = new Company({ companyName, impactLevel, yearsOfExperience, businessCategory });

    await company.save();

    res.status(200).json({
        msg: "Company added to database",
        company
    });
}

export const registeredCompanies = async (req, res) => {
    const query = {companyStatus: true};

    const [quantityCompany, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query)
    ]);

    res.status(200).json({
        msg: "Registered companies",
        quantityCompany,
        companies
    });
}

export const companiesAZ_ZA = async (req, res) => {
    const query = { companyStatus: true };
    let sortDirection = 1;

    if (req.query.order === 'desc') {
        sortDirection = -1;
    }

    const [quantityCompany, companies] = await Promise.all([
        Company.countDocuments(query),
        Company.find(query).sort({ companyName: sortDirection })
    ]);

    res.status(200).json({
        msg: "Companies ordered according to requirements",
        quantityCompany,
        companies
    });
}

export const years = async (req, res) => {
    const query = { companyStatus: true };
    let sortDirection = 1;
    let filterYears = {};

    if (req.query.years) {
        const years = parseInt(req.query.years);
        filterYears = { yearsOfExperience: years };
    }

    if (req.query.order === 'desc') {
        sortDirection = -1;
    }

    const [quantityCompany, companies] = await Promise.all([
        Company.countDocuments({ ...query, ...filterYears }),
        Company.find({ ...query, ...filterYears }).sort({ companyName: sortDirection })
    ]);

    res.status(200).json({
        msg: "Companies that match",
        quantityCompany,
        companies
    });
}

export const category = async (req, res) => {
    const query = { companyStatus: true };
    let sortDirection = 1;
    let filterCategory = {};

    if (req.query.category) {
        const category = req.query.category;

        filterCategory = { businessCategory: category };
    }

    if (req.query.order === 'desc') {
        sortDirection = -1;
    }

    try {
        const [quantityCompany, companies] = await Promise.all([
            Company.countDocuments({ ...query, ...filterCategory }),
            Company.find({ ...query, ...filterCategory }).sort({ companyName: sortDirection })
        ]);

        res.status(200).json({
            msg: "Companies that match",
            quantityCompany,
            companies
        });
    } catch (error) {
        console.error('Error filtering companies by category:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const updateCompany = async (req, res = response) => {
    const { id } = req.params;
    const {_id, companyName, companyStatus, ...rest} = req.body;

    await Company.findByIdAndUpdate(id, rest);

    const company = await Company.findOne({_id: id});

    res.status(200).json({
        msg: 'Updated company',
        company
    });
}

export const excelCompanies = async(req, res) => {
    const query = { companyStatus: true };

    try {
        const companies = await Company.find(query);

        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet('Empresas');

        worksheet.addRow(['Nombre de la empresa', 'Nivel de impacto', 'Años de experiencia', 'Categoría empresarial']);

        companies.forEach(company => {
            worksheet.addRow([
                company.companyName,
                company.impactLevel,
                company.yearsOfExperience,
                company.businessCategory
            ]);
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename="empresas.xlsx"');

        res.status(200).send(buffer);
    } catch (error) {
        console.error('Error when exporting companies to Excel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


