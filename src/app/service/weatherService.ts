import axios from "axios";
import { Weather } from "../../module/BD/model/weather.model.js";
import { broadcastToAll } from "../../module/webSocket/index.js";

interface ApiKayAndName {
  apiKay: string;
  cityName: string;
}

class WeatherClass {
  _intervalId: any = null;
  last_updated_epoch_Current: number | null = null;
  CurrentWeather: any = null;

  async getCurrentWeather() {
    const data: null | ApiKayAndName = {
      apiKay: "d982a5529643435ea50185828250210",
      cityName: "Orenburg",
    };
    if (data) {
      try {
        const CurrentWeather = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${data.apiKay}&q=${data.cityName}&aqi=no&lang=ru`
        );
        console.log("был запрос на API");
        this.CurrentWeather = CurrentWeather.data;
        this.last_updated_epoch_Current = CurrentWeather.data.current.last_updated_epoch;
        return CurrentWeather.data;
      } catch (err) {
        console.log(err);
        this.CurrentWeather = null;
        return null;
      }
    }
    return null;
  }

  updateAndSendToClient() {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = null;
    }
    this._intervalId = setInterval(async () => {
      const date = new Date();
      if (this.last_updated_epoch_Current == null || this.last_updated_epoch_Current * 1000 + 900000 < date.getTime()) {
        const CurrentWeather = await this.getCurrentWeather();
        if (CurrentWeather) return broadcastToAll("weatherCurrent", CurrentWeather);
      }
      console.log(this.last_updated_epoch_Current ? this.last_updated_epoch_Current * 1000 + 900000 : null);
      broadcastToAll("weatherCurrent", this.CurrentWeather);
    }, 5000);
  }

  private async ApiKayAndName(): Promise<ApiKayAndName | null> {
    const ApiKayAndName = await Weather.findOne({ where: { id: 1 } });
    if (ApiKayAndName) {
      return {
        apiKay: ApiKayAndName.APIkay,
        cityName: ApiKayAndName.city,
      };
    }
    return null;
  }
}

export default new WeatherClass();
