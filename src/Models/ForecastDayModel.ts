import { AstroModel } from "./AstroModel";
import { DayModel } from "./DayModel";
import { HourModel } from "./HourModel";

export class ForecastDayModel {
    public date: string;
    public date_epoch: number;
    public day: DayModel;
    public astro: AstroModel;
    public hour: HourModel[];
}
