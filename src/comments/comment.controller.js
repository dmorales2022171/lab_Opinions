'use strict';

import User from '../users/user.model.js';
import Publication from '../publications/publication.model.js';
import Comment from '../comments/comment.model.js';

export const commentPost = async (req, res) => {
    const { content, publicationName, userName } = req.body;

    const user = await User.findOne({ userName })

    if (!user) {
        return res.status(404).json({
            msg: "User not found"
        });
    }

    const publication = await Publication.findOne({ title: publicationName })

    if (!publication) {
        return res.status(404).json({
            msg: "Publication not found"
        });
    }

    const comment = new Comment({
        content,
        author: user._id,
        publication: publication._id
    });

    await comment.save();

    res.status(201).json({
        msg: "Comment created",
        comment,
        author: user.userName,
        publication: publication.title
    });
}

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
