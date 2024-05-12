import { request, response } from 'express';
import Publication from './publication.model.js';

export const publicationPost = async (req, res) => {
    const {title, content} = req.body

    const publication = new Publication({title, content});
    await publication.save();

    res.status(200).json({
        publication,
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
    const { id } = req.params;
    const { _id: userId } = req.user;

    try {
        const publication = await Publication.findOneAndUpdate(
            { _id: id, author: userId },
            { status: false }, 
            { new: true }
        );

        if (!publication) {
            return res.status(403).json({ msg: 'You are not authorized to delete this publication' });
        }

        res.status(200).json({ msg: 'Publication deleted', publication });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
};

export const publicationGet = async(req = request, res = response) => {
    const {limit, from} = req.body;
    const query = {status: true};

    const [total, publications] = await Promise.all([
        Publication.countDocuments(query),
        Publication.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        publications
    })
}


