'use strict'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import adminRoutes from '../src/admin/admin.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import companyRoutes from '../src/company/company.routes.js'
import partnerRoutes from '../src/partner/partner.routes.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/coperex/v1/admin';
        this.authPath = '/coperex/v1/auth';
        this.companyPath = '/coperex/v1/company';
        this.partnerPath = '/coperex/v1/partner';

        this.middlewares();
        this.connectDB();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.adminPath, adminRoutes);
        this.app.use(this.companyPath, companyRoutes);
        this.app.use(this.partnerPath, partnerRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;