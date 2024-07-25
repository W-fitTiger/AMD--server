/**
 * @fileoverview 获取 user 相关模块
 * @author houquan | houquan@bytedance.com
 * @version 1.0.0 | 2023-02-17 | houquan@bytedance.com      // initial version
 */

import express,{ Request } from 'express';
import qs from 'querystring';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
}

export interface UserInfo {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  email: string;
  url: string;
  node_id: string;
  type: string;
}

export async function getAccessToken(
  ctx: Request,
  params: {
    code: string;
    clientId: string;
    clientSecret: string;
    redirectUri: string;
  },
): Promise<TokenResponse | undefined> {
  const { code, clientSecret, clientId, redirectUri } = params;
  const data = {
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  };
  console.log(fetch,'fetch');

  try {
    const response = await fetch(
      `https://github.com/login/oauth/access_token?${qs.stringify(
        data,
      )}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          "Accept":"application/json"
        },
        method: 'post',
      },
    );
    const res= await response.json()
    return res as never as TokenResponse;
  } catch (e) {
    console.log('getAccessToken error:', e);
    return undefined;
  }
}

export async function getUserInfo(
  ctx: Request,
  accessToken: string,
): Promise<UserInfo | undefined> {
  try {
    const response = await fetch(
      `https://api.github.com/user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'get',
      },
    );
    const res= await response.json()
    return res as never as UserInfo;
  } catch (e) {
    console.log('getUserInfo error:', e);
    return undefined;
  }
}

// export async function refresh(ctx: Context, refreshToken: string) {
//   try {
//     const content = {
//       grant_type: 'refresh_token',
//       refresh_token: refreshToken,
//     };
//     const response = await ctx.fetch(
//       `https://passport.feishu.cn/suite/passport/oauth/token?${qs.stringify(
//         content,
//       )}`,
//       {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         method: 'post',
//       },
//     );

//     return response;
//   } catch (e) {
//     console.log('refresh error:', e);
//     return undefined;
//   }
// }

// /**
//  * 生成个人开发者 Token
//  * @param ctx
//  */
export function generatePersonalAccessToken(
  data: Record<string, any>,
  secret: string,
  expiresIn: string,
) {
  const token = jwt.sign(data, secret, { expiresIn });

  return token;
}
