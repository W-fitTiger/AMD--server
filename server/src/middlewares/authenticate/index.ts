import { port } from '../../index.js';
import { COOKIE_KEY, appId, appSecret, jwtSecret } from '../../common/const.js';
import { generatePersonalAccessToken, getAccessToken, getUserInfo } from '../../model/user/index.js';
import dayjs from 'dayjs';
import { Request, Response, NextFunction } from 'express';
import db from "../../db.js";
// import { Token } from './interfacs.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { setUser } from '../../routes/user/sql.js';
import { resolvingCookieInfo } from './cookieInfo.js';
export interface Token {
    token: string;
    expires: number;
    token_type: string
}
const AUTH_BASE_URL = "https://github.com/login/oauth/authorize"
const DEV_HOSTNAME = 'localhost'

export const createAuthentication = function () {
    const authErrorUrl = '/admin/oautherror';
    const redirectUri = '/admin/oauth';
    // const redirectDomain = process.env.REDIRECT_DOMAIN;
    return async (req: Request, resp: Response, next: NextFunction) => {
        const { path, query } = req;
        const origin = getBaseURL(req)
        const href = `${origin}${path}`;
        const u = new URL(href);

        if (/^\/admin\/oautherror\/?$/.test(path)) {
            return next();
        }
        if (/^\/admin\/oauth$/.test(path)) {

            const { code, state } = query as { code: string, state?: string }

            const accessTokenRespon = await getAccessToken(req, {
                code,
                clientId: appId,
                clientSecret: appSecret,
                redirectUri: `${origin}${redirectUri}`,
            });

            if (!accessTokenRespon) {
                return resp.redirect(`${u.origin}${authErrorUrl}`);
            }
            const { access_token, token_type, expires_in = 30 * 24 * 60 * 60, } = accessTokenRespon;
            const accessToken: Token = {
                token: access_token,
                expires: dayjs().unix() + expires_in,
                token_type
            };
            const userInfoResponse = await getUserInfo(req, access_token);
            if (!userInfoResponse) {
                return resp.redirect(`${u.origin}${authErrorUrl}`);
            }

            resp.cookie(
                COOKIE_KEY,
                generatePersonalAccessToken(userInfoResponse, jwtSecret, '365d'),
                {
                    expires: dayjs.unix(accessToken.expires).toDate(),
                    httpOnly: true,
                },
            );

            await setUser(userInfoResponse.id, userInfoResponse, accessToken)

            return resp.redirect(`${u.origin}`);
        }

        const payload: JwtPayload | undefined = resolvingCookieInfo(req, resp)


        if (!payload?.id) {
            const buff = Buffer.from(href);
            const originUrlKey = buff.toString('base64');
            const params = new URLSearchParams({
                client_id: appId,
                redirect_uri: `${origin}${redirectUri}`,
                scope: "user",
                state: originUrlKey
            })

            const redirectUrl = `${AUTH_BASE_URL}?${params.toString()}`;
            console.log(redirectUrl, 'redirectUrl');

            return resp.redirect(redirectUrl);
        }
        next()
    }

}

function getBaseURL(req: Request): string {
    const { protocol, hostname, ips } = req;
    if (hostname === DEV_HOSTNAME) {
        return `${protocol}://100.81.77.234:${port}`
    }
    return `${protocol}://${hostname}:${port}`


}