import { UserInfo } from "../../model/user/index.js";
import connection from "../../db.js";
import { Token } from "../..//middlewares/authenticate/index.js";
export interface User {
    role: string;
    id: number;
    accessToken: string;
    userInfo: string;
}
export const getUser = async (id: string) => {
    const sql = `select * from users where id=${id}`
    return new Promise<User>((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            const res = JSON.parse(JSON.stringify(result))
            console.log(res);
            
            resolve(res[0])
        })
    })
}
export const setUser = async (id: number, userInfo: UserInfo, accessToken: Token) => {
    const accessTokenStr = JSON.stringify(accessToken)
    const userInfoStr = JSON.stringify(userInfo)
    const sql = `INSERT INTO users (id,accessToken,userInfo) VALUES (${id},CAST('${accessTokenStr}' AS JSON),CAST('${userInfoStr}' AS JSON)) ON DUPLICATE KEY UPDATE accessToken=CAST('${accessTokenStr}' AS JSON),userInfo=CAST('${userInfoStr}' AS JSON);`
    return new Promise<void>((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }


            resolve(result)
        })
    })
}
