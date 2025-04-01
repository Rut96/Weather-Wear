import { ConditionModel } from "./ConditionModel";

export class DayModel {
    public maxtemp_c: number;
    public maxtemp_f: number;
    public mintemp_c: number;
    public mintemp_f: number;
    public avgtemp_c: number;
    public avgtemp_f: number;
    public maxwind_mph: number;
    public maxwind_kph: number;
    public totalprecip_mm: number;
    public totalprecip_in: number;
    public totalsnow_cm: number;
    public avgvis_km: number;
    public avgvis_miles: number;
    public avghumidity: number;
    public daily_will_it_rain: number;
    public daily_chance_of_rain: number;
    public daily_will_it_snow: number;
    public daily_chance_of_snow: number;
    public condition: ConditionModel;
    public uv: number;
}
