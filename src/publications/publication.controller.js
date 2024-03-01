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
        userName: user.userName,
    });

    await publication.save();

    res.status(200).json({
        publication,
        userName: user.userName,
        mail: user.mail
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

// Controlador de Publicaciones
// Controlador de Publicaciones
export const publicationDelete = async (req, res = response) => {
    const { id } = req.params;
    const { _id: userId } = req.user; // Obtener el ID del usuario del token JWT

    try {
        // Verificar si la publicación existe y si el usuario es el autor
        const publication = await Publication.findOneAndUpdate(
            { _id: id, author: userId }, // Solo actualizar si el usuario es el autor de la publicación
            { status: false }, // Cambiar el estado de la publicación a false
            { new: true } // Devolver la publicación actualizada
        );

        // Verificar si la publicación no existe o el usuario no es el autor
        if (!publication) {
            return res.status(403).json({ msg: 'You are not authorized to delete this publication' });
        }

        res.status(200).json({ msg: 'Publication deleted', publication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};




