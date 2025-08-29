interface AppConfig {
  Server: {
    ip: string;
    port: number;
  };
  BD: {
    ip: string;
    port: number;
    login: string;
    pass: string;
    BDname: string;
  };
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
  admin: {
    login: string;
    pass: string;
  };
}
export { AppConfig };
