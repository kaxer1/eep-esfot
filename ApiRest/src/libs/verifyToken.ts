import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

interface IPayload {
    _id: number,
    rol: number,
    iat: number,
    exp: number
}

export const TokenValidation = (req: Request, res: Response, next: NextFunction) => {

    console.log(req.header('Authorization'))
    const token = req.header('Authorization')?.split(' ')[1];
    
    if(!token) return res.status(401).json('Acceso denegado');

    try {
        
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as IPayload;
    
        console.log(payload);
        
        req.userId = payload._id;
        req.userRol = payload.rol;
    
        next()
    } catch (error) {
        console.log(error.name, ' ', error.message);
        if (error.name === 'TokenExpiredError') return res.status(404).json({message:"El tiempo de votación para tu usuario a expirado."});
    }
}