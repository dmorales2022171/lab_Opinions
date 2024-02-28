import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from './user.model.js';

export const userPost = async (req, res) =>{
    const {name, mail, password} = req.body;
    const user = new User({name, mail, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    })
}

export const userPut = async(req, res = response)=>{
    const { id } = req.params;
    const {_id, password, mail, ...resto} = req.body;
    
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    await User.findByIdAndUpdate(id, resto);

    const user = await User.findOne({_id: id});

    res.status(200).json({
        msg: 'User updated',
        user
    })
}