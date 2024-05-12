import mongoose from 'mongoose';
import Publication from '../src/publications/publication.model.js';


export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connected to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Trying to connect');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to MongoDB');
        });
        mongoose.connection.on('open', async () => {
            console.log('MongoDB | connected to database');

            const count = await Publication.countDocuments();
            if (count === 0) {
                const defaultPublications = [
                    { title: 'Practica supervisada', content: 'Content of first publication' },
                    { title: 'Second Publication', content: 'Content of second publication' },
                    { title: 'Third Publication', content: 'Content of third publication' }
                ];

                for (const publicationData of defaultPublications) {
                    const publication = new Publication(publicationData);
                    await publication.save();
                }

                console.log('Default publications created successfully.');
            }
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | reconnected to MongoDB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | disconnected');
        });

        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        });
    } catch (error) {
        console.error('Database connection failed', error);
    }
};