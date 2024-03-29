import Role from '../roles/role.model.js'
import User from '../users/user.model.js'
import Publication from '../publications/publication.model.js'
import Comment from '../comments/comment.model.js'

export const isRoleValid = async (role = '') =>{
    const existRole = await  Role.findOne({role});
    if(!existRole){ 
        throw new Error(`the role ${role} already exists in the database`);
    }
}

export const existsMail = async (mail= '') =>{
    const existMail = await User.findOne({mail});
    if(existMail){
        throw new Error(`the mail ${mail}  has already been registered`)
    }
}

export const existUserById = async (id = '') =>{
    const existsUser = await User.findById (id);
    if(!existsUser) {
        throw new Error(`The ID: ${id} not exists`);
    }
}

export const existPublicationById = async (id = '') =>{
    const existPublication = await Publication.findById(id);
    if(!existPublication){
        throw new Error(`The ID: ${id} not exists`);
    }
}

export const existCommentById = async (id = '') => {
    const existComment = await Comment.findById(id);
    if(!existComment){
        throw new Error(`The ID: ${id} not exists`);
    }
}