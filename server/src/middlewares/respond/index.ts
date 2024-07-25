/**
 * @fileoverview 接口和 html 响应
 * @author houquan | houquan@bytedance.com
 * @version 1.0.0 | 2023-02-10 | houquan@bytedance.com      // initial version
 */

import { Request, Response, NextFunction } from 'express'

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
export function createRespond() {
    return async (req: Request, resp: Response, next: NextFunction) => {
        const { path } = req;
        if (/^\/admin\/api\//.test(path)) {
            return next();
        } else {
            return   resp.sendFile(join(__dirname, "../../client/dist/index.html"))
        }
    };
}
