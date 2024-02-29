import User from '../users/user.model.js';
import Publication from './publication.model.js';

export const publicationPost = async (req, res) => {
    const data = req.body;

    const user = await User.findOne({ userName: data.userName });

    if (!user) {
        return res.status(404).send({
            message: "User does not exist"
        });
    }


    const publication = new Publication({
        ...data,
        author: user._id,
        userName: user.userName
    });

    await publication.save();

    res.status(200).json({
        publication,
        userName: user.userName
    });
}

export const publicationPut = async (req, res = response) => {
    const { id } = req.params;
    const {_id, author, ...resto} = req.body;

    await Publication.findByIdAndUpdate(id, resto);

    const publication = await Publication.findOne({_id: id});

    res.status(200).json({
        msg: 'publication edited',
        publication
    });
}

export const publicationDelete = async (req, res = response) => {
    const { userName } = req.params; // Obtener el nombre de usuario de los parámetros de la solicitud

    try {
        // Buscar al usuario por su nombre de usuario
        const user = await User.findOne({ userName });

        // Verificar si se encontró al usuario
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Cambiar el estado de las publicaciones del usuario a false
        const updatedPublications = await Publication.updateMany(
            { author: user._id }, // Buscar publicaciones del usuario por su ID
            { status: false } // Actualizar el campo 'status' a false
        );

        res.status(200).json({
            msg: 'Publications deleted',
            publicationsUpdated: updatedPublications.nModified // Número de publicaciones actualizadas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};
