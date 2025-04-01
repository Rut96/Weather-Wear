import axios from "axios"
import { WeatherResponseModel } from "../Models/WeatherResponseModel";
import { appConfig } from "../Utils/AppConfig";

class WeatherService {
    public async getWeatherForecast(city: string, days: number = 3): Promise<WeatherResponseModel> {
        try {
            const response = await axios.get(`${appConfig.baseUrl}/forecast.json?key=${appConfig.apiKey}&q=${city}&days=3&aqi=no&alerts=no`);
            const weatherData = this.mapResponseToModel(response.data);
            return weatherData;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            throw error;
        }
    }

    private mapResponseToModel(data: any): WeatherResponseModel {
        const weatherResponse = new WeatherResponseModel();
        
        // Map Location
        if (data.location) {
            weatherResponse.location = {
                name: data.location.name || "",
                region: data.location.region || "",
                country: data.location.country || "",
                lat: data.location.lat || 0,
                lon: data.location.lon || 0,
                tz_id: data.location.tz_id || "",
                localtime_epoch: data.location.localtime_epoch || 0,
                localtime: data.location.localtime || ""
            };
        }

        // Map Current Weather
        if (data.current) {
            weatherResponse.current = {
                last_updated_epoch: data.current.last_updated_epoch || 0,
                last_updated: data.current.last_updated || "",
                temp_c: data.current.temp_c || 0,
                temp_f: data.current.temp_f || 0,
                is_day: data.current.is_day || 0,
                condition: {
                    text: data.current.condition?.text || "",
                    icon: data.current.condition?.icon || "",
                    code: data.current.condition?.code || 0
                },
                wind_mph: data.current.wind_mph || 0,
                wind_kph: data.current.wind_kph || 0,
                wind_degree: data.current.wind_degree || 0,
                wind_dir: data.current.wind_dir || "",
                pressure_mb: data.current.pressure_mb || 0,
                pressure_in: data.current.pressure_in || 0,
                precip_mm: data.current.precip_mm || 0,
                precip_in: data.current.precip_in || 0,
                humidity: data.current.humidity || 0,
                cloud: data.current.cloud || 0,
                feelslike_c: data.current.feelslike_c || 0,
                feelslike_f: data.current.feelslike_f || 0,
                heatindex_c: data.current.heatindex_c || 0,
                vis_km: data.current.vis_km || 0,
                vis_miles: data.current.vis_miles || 0,
                uv: data.current.uv || 0,
                gust_mph: data.current.gust_mph || 0,
                gust_kph: data.current.gust_kph || 0
            };
        }

        // Map Forecast
        if (data.forecast) {
            weatherResponse.forecast = {
                forecastday: data.forecast.forecastday?.map((dayData: any) => {
                    return {
                        date: dayData.date || "",
                        date_epoch: dayData.date_epoch || 0,
                        day: {
                            maxtemp_c: dayData.day?.maxtemp_c || 0,
                            maxtemp_f: dayData.day?.maxtemp_f || 0,
                            mintemp_c: dayData.day?.mintemp_c || 0,
                            mintemp_f: dayData.day?.mintemp_f || 0,
                            avgtemp_c: dayData.day?.avgtemp_c || 0,
                            avgtemp_f: dayData.day?.avgtemp_f || 0,
                            maxwind_mph: dayData.day?.maxwind_mph || 0,
                            maxwind_kph: dayData.day?.maxwind_kph || 0,
                            totalprecip_mm: dayData.day?.totalprecip_mm || 0,
                            totalprecip_in: dayData.day?.totalprecip_in || 0,
                            totalsnow_cm: dayData.day?.totalsnow_cm || 0,
                            avgvis_km: dayData.day?.avgvis_km || 0,
                            avgvis_miles: dayData.day?.avgvis_miles || 0,
                            avghumidity: dayData.day?.avghumidity || 0,
                            daily_will_it_rain: dayData.day?.daily_will_it_rain || 0,
                            daily_chance_of_rain: dayData.day?.daily_chance_of_rain || 0,
                            daily_will_it_snow: dayData.day?.daily_will_it_snow || 0,
                            daily_chance_of_snow: dayData.day?.daily_chance_of_snow || 0,
                            condition: {
                                text: dayData.day?.condition?.text || "",
                                icon: dayData.day?.condition?.icon || "",
                                code: dayData.day?.condition?.code || 0
                            },
                            uv: dayData.day?.uv || 0
                        },
                        astro: {
                            sunrise: dayData.astro?.sunrise || "",
                            sunset: dayData.astro?.sunset || "",
                            moonrise: dayData.astro?.moonrise || "",
                            moonset: dayData.astro?.moonset || "",
                            moon_phase: dayData.astro?.moon_phase || "",
                            moon_illumination: dayData.astro?.moon_illumination || "",
                            is_moon_up: dayData.astro?.is_moon_up || 0,
                            is_sun_up: dayData.astro?.is_sun_up || 0
                        },
                        hour: dayData.hour?.map((hourData: any) => {
                            return {
                                time_epoch: hourData.time_epoch || 0,
                                time: hourData.time || "",
                                temp_c: hourData.temp_c || 0,
                                temp_f: hourData.temp_f || 0,
                                is_day: hourData.is_day || 0,
                                condition: {
                                    text: hourData.condition?.text || "",
                                    icon: hourData.condition?.icon || "",
                                    code: hourData.condition?.code || 0
                                },
                                wind_mph: hourData.wind_mph || 0,
                                wind_kph: hourData.wind_kph || 0,
                                wind_degree: hourData.wind_degree || 0,
                                wind_dir: hourData.wind_dir || "",
                                pressure_mb: hourData.pressure_mb || 0,
                                pressure_in: hourData.pressure_in || 0,
                                precip_mm: hourData.precip_mm || 0,
                                precip_in: hourData.precip_in || 0,
                                humidity: hourData.humidity || 0,
                                cloud: hourData.cloud || 0,
                                feelslike_c: hourData.feelslike_c || 0,
                                feelslike_f: hourData.feelslike_f || 0,
                                windchill_c: hourData.windchill_c || 0,
                                windchill_f: hourData.windchill_f || 0,
                                heatindex_c: hourData.heatindex_c || 0,
                                heatindex_f: hourData.heatindex_f || 0,
                                dewpoint_c: hourData.dewpoint_c || 0,
                                dewpoint_f: hourData.dewpoint_f || 0,
                                will_it_rain: hourData.will_it_rain || 0,
                                chance_of_rain: hourData.chance_of_rain || 0,
                                will_it_snow: hourData.will_it_snow || 0,
                                chance_of_snow: hourData.chance_of_snow || 0,
                                vis_km: hourData.vis_km || 0,
                                vis_miles: hourData.vis_miles || 0,
                                gust_mph: hourData.gust_mph || 0,
                                gust_kph: hourData.gust_kph || 0,
                                uv: hourData.uv || 0
                            };
                        }) || []
                    };
                }) || []
            };
        }

        return weatherResponse;
    }
}

export const weatherService = new WeatherService();