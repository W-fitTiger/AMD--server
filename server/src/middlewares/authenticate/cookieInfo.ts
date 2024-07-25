import { COOKIE_KEY,jwtSecret } from "../../common/const.js";
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export function resolvingCookieInfo(req:Request,resp:Response) {
    const jwtstr = req.cookies[COOKIE_KEY]
    if (jwtstr) {
        try {
            return jwt.verify(jwtstr as string, jwtSecret) as JwtPayload;
        } catch (e) {
            console.error('jwt verify error');
            resp.cookie(COOKIE_KEY, null);
        }
    }
}