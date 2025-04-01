import { ConditionModel } from "./ConditionModel";

export class HourModel {
    public time_epoch: number;
    public time: string;
    public temp_c: number;
    public temp_f: number;
    public is_day: number;
    public condition: ConditionModel;
    public wind_mph: number;
    public wind_kph: number;
    public wind_degree: number;
    public wind_dir: string;
    public pressure_mb: number;
    public pressure_in: number;
    public precip_mm: number;
    public precip_in: number;
    public humidity: number;
    public cloud: number;
    public feelslike_c: number;
    public feelslike_f: number;
    public windchill_c: number;
    public windchill_f: number;
    public heatindex_c: number;
    public heatindex_f: number;
    public dewpoint_c: number;
    public dewpoint_f: number;
    public will_it_rain: number;
    public chance_of_rain: number;
    public will_it_snow: number;
    public chance_of_snow: number;
    public vis_km: number;
    public vis_miles: number;
    public gust_mph: number;
    public gust_kph: number;
    public uv: number;
}
