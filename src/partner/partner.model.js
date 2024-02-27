import mongoose from "mongoose";

const PartnerSchema = mongoose.Schema({
    partnerName:{
        type: String,
        required: [true, "The partner's name is required"]
    },
    companyName:{
        type: String,
        required: [true, "Compa name is required"]
    },
    activitySector:{
        type: String,
        required: [true, "Sector activity is mandatory"]
    },
    companyImpactLevel:{
        type: String,
        required: [true, "The company's impact level is mandatory"]
    },
    yearsOfCompanyExperience:{
        type: Number,
        required: [true, "The years of experience of the company is mandatory"]
    },
    businessCategoryOfTheCompany:{
        type: String,
        required: [true, "The business category of the company is mandatory"]
    },
    state:{
        type: Boolean,
        default: true
    }  
});

export default mongoose.model('Partner', PartnerSchema);