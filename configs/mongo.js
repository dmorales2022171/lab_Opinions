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
                    { title: 'Practica supervisada', content: 'el "Sistema de Adopción de Mascotas" es más que una simple API: es una herramienta poderosa para conectar a las mascotas necesitadas con hogares amorosos, mientras promueve la responsabilidad y el cuidado de los animales en la comunidad. Con su enfoque centrado en el usuario y sus características intuitivas, esta API está destinada a hacer que el proceso de adopción de mascotas sea más accesible, eficiente y gratificante para todos los involucrados.' },
                    { title: 'Taller III', content: 'el "Gestor de Supermercado" es una herramienta versátil y poderosa que simplifica la gestión operativa de los supermercados al ofrecer una plataforma centralizada para gestionar inventarios, procesar transacciones y brindar una experiencia de compra fluida y conveniente para los clientes. Con su enfoque en la eficiencia y la facilidad de uso, esta API está diseñada para mejorar la productividad y la experiencia del cliente en el entorno competitivo de la industria minorista.' },
                    { title: 'Tecnologia III', content: 'nuestro viaje de aprendizaje en tecnologías web fue una experiencia enriquecedora que nos proporcionó una comprensión sólida y diversa de las herramientas y técnicas necesarias para crear aplicaciones web modernas y exitosas. Estamos emocionados de aplicar este conocimiento en proyectos futuros y de seguir explorando las nuevas tendencias y avances en este apasionante campo.' }
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