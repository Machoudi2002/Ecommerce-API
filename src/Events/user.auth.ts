import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';
import { ApiKeys } from '../DB/Schema/api.schema';
import dotenv from 'dotenv';
interface AuthenticatedRequest extends Request {
    user?: any;
}

dotenv.config();

const SECRET_ACCESS_TOKEN = "18a7d8bfeaf0ebd852d3924d39a0b795a3089579554b08ea831cbccb94dcab7d";
const SECRET_REFRESH_TOKEN = "52af811911a59949d88cc554d7aff747b545c97572519bb9c816d99c63319987";

        
export const generateToken = (userId: string) => {
    const token = jwt.sign({userId}, process.env.ACCESS_TOKEN || SECRET_ACCESS_TOKEN, { expiresIn: "1h"})
    return token;
}


export const verifyAccess = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    const token = req.cookies.jwtToken

    if (!token) {
        return res.status(401).json({ message: "Invalid token provided." });
    }

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN || SECRET_ACCESS_TOKEN, (err: VerifyErrors | null, decoded: any) => {
            if (err) {
                return res.status(403).json({ message: err.message });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers["X-Api-Key"];
        const validKey = await ApiKeys.findOne({ apiKey });
        if (!validKey) {
            res.status(401).json({ message: "Invalid Api Key provided." });
            return;
        }
        next()

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
