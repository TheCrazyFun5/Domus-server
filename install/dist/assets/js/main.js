const IPserver = document.getElementById("IPserver");
const PORTserver = document.getElementById("PORTserver");

const IPbdServer = document.getElementById("IPbdServer");
const PORTbdServer = document.getElementById("PORTbdServer");
const BDlogin = document.getElementById("BDlogin");
const BDpass = document.getElementById("BDpass");

const MQTTport = document.getElementById("MQTTport");
const MQTTlogin = document.getElementById("MQTTlogin");
const MQTTpass = document.getElementById("MQTTpass");
const MQTTip = document.getElementById("MQTTip");
const mqttCheckBox = document.getElementById("MQTTcheckbox");

const JWTkay = document.getElementById("JWTkay");

mqttCheckBox.addEventListener("change", function () {
  if (this.checked) {
    MQTTip.setAttribute("disabled", "disabled");
  } else {
    MQTTip.removeAttribute("disabled");
  }
});

function checkedAndSend() {
  //ipV4
  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  if (!ipRegex.test(IPserver.value)) return alert("[веб-сервер] Неверный IP-адрес! Пример: 192.168.1.1");
  if (!PORTserver.value || PORTserver.value < 1 || PORTserver.value > 65535)
    return alert("[веб-сервер] Порт должен быть числом от 1 до 65535");

  if (!ipRegex.test(IPbdServer.value)) return alert("[база данных] Неверный IP-адрес! Пример: 192.168.1.1");
  if (!PORTbdServer.value || PORTbdServer.value < 1 || PORTbdServer.value > 65535)
    return alert("[база данных] Порт должен быть числом от 1 до 65535");
  if (BDlogin.value.length < 3) return alert("[база данных] Логин должен содержать минимум 3 символа");

  if (!MQTTport.value || MQTTport.value < 1 || MQTTport.value > 65535)
    return alert("[MQTT] Порт должен быть числом от 1 до 65535");
  if (MQTTlogin.value.length < 3) return alert("[MQTT] Логин должен содержать минимум 3 символа");
  if (MQTTpass.value.length < 6) return alert("[MQTT] Пароль должен содержать минимум 6 символов");
  if (!ipRegex.test(MQTTip.value)) return alert("[MQTT] Неверный IP-адрес! Пример: 192.168.1.1");

  if (JWTkay.value.length < 20) return alert("[JWT] Секретный ключ должен содержать минимум 20 символов");
}
