import { response, request } from "express";
import bcryptjs from "bcryptjs";
import User from './user.model.js';

export const userPost = async (req, res) =>{
    const {userName, mail, password} = req.body;
    const user = new User({userName, mail, password});

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    await user.save();

    res.status(200).json({
        user
    })
}

export const userPut = async(req, res = response)=>{
    const { id } = req.params;
    const { oldPassword, newPassword, ...resto } = req.body;
    
    try {
        const user = await User.findById(id);
        
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const validPassword = bcryptjs.compareSync(oldPassword, user.password);
        
        if (!validPassword) {
            return res.status(400).json({ msg: 'Invalid old password' });
        }

        if (newPassword) {
            const salt = bcryptjs.genSaltSync();
            resto.password = bcryptjs.hashSync(newPassword, salt);
        }

        await User.findByIdAndUpdate(id, resto);

        const updatedUser = await User.findById(id);

        res.status(200).json({
            msg: 'User updated',
            user: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

export const userGet = async (req= request, res = response) => {
    const {limit, from} = req.body;
    const query = {status: true}

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
        total,
        users
    })
}
