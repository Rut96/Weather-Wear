import { CurrentWeatherModel } from "./CurrentWeatherModel";
import { ForecastModel } from "./ForecastModel";
import { LocationModel } from "./LocationModel";

export class WeatherResponseModel {
    location: LocationModel;
    current: CurrentWeatherModel;
    forecast: ForecastModel;
}
