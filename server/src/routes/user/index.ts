import express, { Request, Response } from "express";
import { getUser } from "./sql.js";
import { resolvingCookieInfo } from "../../middlewares/authenticate/cookieInfo.js";
import { JwtPayload } from "jsonwebtoken";

const router = express.Router();
router.get('/me', async (req: Request, res: Response) => {
    const payload = resolvingCookieInfo(req, res) as JwtPayload
    if (payload?.id) {
        const data = await getUser(payload.id)
        const newDate = {
            id: data.id,
            role: JSON.parse(data.role),
            ...JSON.parse(data.userInfo)
        }
        res.status(200).json(newDate);
    }

})
export default router