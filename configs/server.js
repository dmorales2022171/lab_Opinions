'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import userRoutes from '../src/users/user.router.js'
import publicationRoutes from '../src/publications/publication.router.js'
import authRoutes from '../src/auth/auth.router.js'
import commentRoutes from '../src/comments/comment.router.js'

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/opinionApi/v1/users',
        this.publicationPath =  '/opinionApi/v1/publications'
        this.authPath = '/opinionApi/v1/auth'
        this.commentPath = '/opinionApi/v1/comments'

        this.middlewares();
        this.connectDB();
        this.routes();
    
    }


    async connectDB() {
        await dbConnection()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.userPath, userRoutes);
        this.app.use(this.publicationPath, publicationRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.commentPath, commentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server runnig on port ', this.port);
        });
    }

}

export default Server;