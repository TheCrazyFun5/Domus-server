interface dbData {
  dms: string;
  ip: string;
  port: number;
  login: string;
  pass: string;
  dbName: string;
}

interface AppConfig {
  Server: {
    port: number;
  };
  BD: dbData;
  MQTT: {
    builtIn: boolean;
    ip: string;
    port: number;
    login: string;
    pass: string;
  };
  JWT: {
    accessSecretKey: string;
    refreshSecretKey: string;
  };
}
export { AppConfig, dbData };
