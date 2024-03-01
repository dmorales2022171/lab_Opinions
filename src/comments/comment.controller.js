'use strict';

import User from '../users/user.model.js';
import Publication from '../publications/publication.model.js'
import Comment from '../comments/comment.model.js'

export const commentPost = async (req, res) =>{
    const {content, publicationName} = req.body;
    const {userName} = req.body;

    const user = await User.findOne({userName})

    if(!user){
        return res.status(404).json({
            msg: "User not found"
        })
    }
}