import jwt from 'jsonwebtoken';

import config from '../config';

import User from '../models/usuarios.model';
import Role from '../models/roles.model'

export const verifyToken = async (req, res, next) => {

    try {

        const token = req.headers["x-access-token"];

        if(!token) return res.status(403).json({message: "No token provided"});

        const decode = jwt.verify(token, config.SECRET);

        req.userId = decode.id;

        const user = await User.findById(req.userId, {password: 0});

        if(!user) return res.status(404).json({message: "no user found"});

        next();
        
    } catch (error) {

        return res.status(401).json({message: "Unauthorized"});
        
    }

}

export const isLider = async (req, res, next) => {

    const user = await User.findById(req.userId);

    const roles = await Role.find({_id: { $in: user.roles } });

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "Lider") {
            next();
            return;
        }
        
    }

    return res.status(403).json({ message: "Require Lider role"});

}

export const isCoordinador = async (req, res, next) => {
    
    const user = await User.findById(req.userId);

    const roles = await Role.find({_id: { $in: user.roles } });

    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "Coordinador") {
            next();
            return;
        }
        
    }

    return res.status(403).json({ message: "Require Coordinador role"});
}