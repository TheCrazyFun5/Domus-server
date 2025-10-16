import axios from "axios";
import { Weather } from "../../module/BD/model/weather.model.js";

interface ApiKayAndName {
  apiKay: string;
  cityName: string;
}

class WeatherClass {
  last_updated_epoch_Current: number | null = null;
  CurrentWeather: any = null;

  async getCurrentWeather() {
    const data: ApiKayAndName | null = await this.ApiKayAndName();
    if (data) {
      try {
        let CurrentWeather = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${data.apiKay}&q=${data.cityName}&aqi=no`
        );
        this.CurrentWeather = CurrentWeather;
        this.last_updated_epoch_Current = CurrentWeather.data.current.last_updated_epoch;
        return CurrentWeather;
      } catch (err) {
        this.CurrentWeather = null;
        return null;
      }
    }
    return null;
  }

  private async ApiKayAndName(): Promise<ApiKayAndName | null> {
    const ApiKayAndName = await Weather.findOne({ where: { id: 0 } });
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
