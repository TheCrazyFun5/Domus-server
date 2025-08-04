interface AppConfig {
  Server: {
    ip: string;
    port: number;
  };
  BD: {
    ip: string;
    port: string | number;
    login: string;
    pass: string;
  };
  MQTT: {
    builtIn: boolean;
    ip: string;
    port: string | number;
    login: string;
    pass: string;
  };
  JWT: {
    secretKey: string;
  };
}
export { AppConfig };
