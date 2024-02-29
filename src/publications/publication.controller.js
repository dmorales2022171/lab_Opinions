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

import const publicationPut = async (req, res = response) => {
    
}
