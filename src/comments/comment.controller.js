'use strict';

import Publication from '../publications/publication.model.js';
import Comment from '../comments/comment.model.js';
import { request, response } from 'express';

export const commentPost = async (req, res) => {
    const { content, publicationId } = req.body; 

    try {
        const publication = await Publication.findById(publicationId); 

        if (!publication) {
            return res.status(404).json({
                msg: "Publicación no encontrada"
            });
        }

        const comment = new Comment({
            content,
            publication: publication._id
        });

        await comment.save();

        res.status(201).json({
            msg: "Comentario creado",
            comment,
            publication: publication.title
        });
    } catch (error) {
        console.error("Error creando comentario:", error);
        res.status(500).json({ msg: "Error del servidor" });
    }
};


export const commentPut = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    const { _id: userId } = req.user;

    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.author.toString() == userId) {
        comment.content = content;
        await comment.save();
        return res.status(200).json({ msg: 'Comment updated successfully', comment });
    } else {
        return res.status(403).json({ msg: 'You are not authorized to edit this comment' });
    }
};

export const commentDelete = async (req, res = response) => {
    const { id } = req.params;
    const { _id: userId } = req.user;

    const comment = await Comment.findOneAndUpdate(
        { _id: id, author: userId },
        { status: false },
        { new: true }
    );

    if (!comment) {
        return res.status(403).json({
            msg: 'You are not authorized to delete this comment'
        });
    }

    return res.status(200).json({
        msg: 'Comment deleted',
        comment
    });

}

export const commentGet = async(req = request, res = response) => {
    const {limit, from} = req.body;
    const query = {status: true};

    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
        .populate('publication', 'title')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
        total, 
        comments
    })
}