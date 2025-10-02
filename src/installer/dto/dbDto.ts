import { dbData } from "../../model/modelConfig.js";
import errorApi from "../../app/service/errorService.js";
const DMSname: string[] = ["mysql", "postgres", "mariadb", "oracle", "mssql"];
const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export default function dbDto(data: any): dbData {
  let error: string[] = [];

  if (!data) throw errorApi.badRequest("Нет данных");
  if (!data.dms || !DMSname.includes(data.dms)) error.push(`DMS может равняться: ${DMSname}`);
  if (!data.ip || typeof data.ip != "string" || !ipRegex.test(data.ip)) error.push(`Неверный IP`);
  if (!data.port || typeof data.port != "number" || data.port <= 0 || data.port > 65535)
    error.push(`Порт должен быть числом от 1 до 65534`);
  if (!data.login || typeof data.login != "string" || data.login.length < 4)
    error.push("Логин должен быть >= 4 символов");
  if (typeof data.pass != "string") error.push("Пароль должен быть стракой даже если он ''");
  if (!data.dbName || typeof data.dbName != "string" || data.dbName.length < 1)
    error.push("Название таблицы должно иметь >= 1 символов");

  if (error && error.length > 0) throw errorApi.badRequest(`${error.join("\n")}`);
  let dto: dbData = {
    dms: data.dms,
    ip: data.ip,
    port: data.port,
    login: data.login,
    pass: data.pass,
    dbName: data.dbName,
  };
  return dto;
}
