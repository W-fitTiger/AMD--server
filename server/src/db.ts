import mysql from "mysql";

const connection = mysql.createConnection({
  host: '127.0.0.1',	//连接的数据库地址。（默认:localhost）
  user: 'root',		//mysql的连接用户名
  password: 'admin123',		// 对应用户的密码
  database: 'admin'
});

export default connection




