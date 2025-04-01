import { ForecastDayModel } from "../../../Models/ForecastDayModel";
import "./WeatherForecast.css";

import cloud1 from "../../../Assets/Images/cloud1.png";
import cloud2 from "../../../Assets/Images/cloud2.png";
import cloud3 from "../../../Assets/Images/cloud3.png";

type WeatherForecastProps = {
    forecastDays: ForecastDayModel[];
}

export function WeatherForecast(props: WeatherForecastProps): JSX.Element {
    return (
        <div className="WeatherForecast">
            <h3>3-Day Forecast</h3>
            
            <div className="forecast-clouds">
                <img src={cloud1} className="forecast-cloud cloud-left" />
                <img src={cloud2} className="forecast-cloud cloud-right" />
                <img src={cloud3} className="forecast-cloud cloud-bottom" />
            </div>
            
            <div className="forecast-days">
                {props.forecastDays.map((day: ForecastDayModel, index: number) => {
                    const isToday = index === 0;
                    
                    return (
                        <div 
                            key={day.date_epoch} 
                            className={`forecast-day ${isToday ? 'today' : ''}`}
                        >
                            <p className="forecast-date">
                                {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </p>
                            
                            <div className="forecast-icon-container">
                                <img 
                                    src={`https:${day.day.condition.icon}`} 
                                    alt={day.day.condition.text} 
                                    className="forecast-icon"
                                />
                            </div>
                            
                            <p className="forecast-condition">
                                {day.day.condition.text}
                            </p>
                            
                            <div className="forecast-temps">
                                <span className="max">{Math.round(day.day.maxtemp_c)}°</span>
                                <span className="min">{Math.round(day.day.mintemp_c)}°</span>
                            </div>
                            
                            <div className="forecast-details">
                                <div className="forecast-detail">
                                    <span className="detail-label">Humidity</span>
                                    <span className="detail-value">{day.day.avghumidity}%</span>
                                </div>
                                <div className="forecast-detail">
                                    <span className="detail-label">Wind</span>
                                    <span className="detail-value">{Math.round(day.day.maxwind_kph)} km/h</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}