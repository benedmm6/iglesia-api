import User from '../models/usuarios.model';
import Role from '../models/roles.model';
import jwt from 'jsonwebtoken';

import config from "../config";

export const singUp = async (req, res) => {

    const {email, password, roles, name} = req.body;

    const newUsuario = new User({
        email,
        password: await User.encryptPassword(password),
        name
    })

    if(roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        newUsuario.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name: "Lider"});
        newUsuario.roles = [role._id];
    }
    
    const savedUser = await newUsuario.save();

    console.log(savedUser);

    const token = jwt.sign({id: savedUser._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.status(200).json({token});
} 

export const singIn = async (req, res) => {
    
    const userFound = await User.findOne({email: req.body.email}).populate("roles");

    if (!userFound) return res.json({message: "User not found"});

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);

    if (!matchPassword) return res.status(401).json({token: null, message: 'Invalid password'});

    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400
    })

    res.json({token});
} 