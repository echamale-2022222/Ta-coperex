import mongoose from "mongoose";

const CompanySchema = mongoose.Schema({
    companyName:{
        type: String, 
        required: [true, "Company name is required"]
    },
    impactLevel:{
        type: String,
        required: [true, "Impact level is mandatory"]
    },
    yearsOfExperience:{
        type: Number,
        required: [true, "Years of experience are mandatory"]
    },
    businessCategory:{
        type: String,
        required: [true, "Business category is mandatory"]
    },
    companyStatus:{
        type: Boolean,
        default: true
    }
});

export default mongoose.model('Company', CompanySchema);