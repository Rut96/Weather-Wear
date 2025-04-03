import { CurrentWeatherModel } from "../../../Models/CurrentWeatherModel";
import { LocationModel } from "../../../Models/LocationModel";
import "./CurrentWeather.css";

import cloud1 from "../../../Assets/Images/cloud1.png";
import cloud2 from "../../../Assets/Images/cloud2.png";
import cloud3 from "../../../Assets/Images/cloud3.png";
import cloud4 from "../../../Assets/Images/cloud4.png";
import cloud5 from "../../../Assets/Images/cloud5.png";
import cloud6 from "../../../Assets/Images/cloud6.png";

type CurrentWeatherProps = {
    current: CurrentWeatherModel;
    location: LocationModel;
}

export function CurrentWeather(props: CurrentWeatherProps): JSX.Element {
    const isDay = props.current.is_day === 1;
    
    const windDirection = props.current.wind_kph > 0 ? 'right-to-left' : 'left-to-right';
    const cloudLayers = [
        // Foreground clouds - fastest moving
        { 
            image: cloud1, 
            className: `cloud-img cloud-foreground cloud-1 wind-${windDirection}`,
            speed: 'fast',
            scale: 0.9,
            opacity: 0.7
        },
        { 
            image: cloud3, 
            className: `cloud-img cloud-foreground cloud-2 wind-${windDirection}`,
            speed: 'fast',
            scale: 1,
            opacity: 0.8
        },
        
        // Midground clouds - medium speed
        { 
            image: cloud2, 
            className: `cloud-img cloud-midground cloud-3 wind-${windDirection}`,
            speed: 'medium',
            scale: 0.7,
            opacity: 0.6
        },
        { 
            image: cloud5, 
            className: `cloud-img cloud-midground cloud-4 wind-${windDirection}`,
            speed: 'medium',
            scale: 0.8,
            opacity: 0.6
        },
        
        // Background clouds - slowest moving, appear distant
        { 
            image: cloud4, 
            className: `cloud-img cloud-background cloud-5 wind-${windDirection}`,
            speed: 'slow',
            scale: 0.5,
            opacity: 0.4
        },
        { 
            image: cloud6, 
            className: `cloud-img cloud-background cloud-6 wind-${windDirection}`,
            speed: 'slow',
            scale: 0.45,
            opacity: 0.35
        }
    ];

    return (
        <div className={`CurrentWeather ${isDay ? 'day-background' : 'night-background'}`}>
            {/* Stars for night mode - only render when it's night (is_day !== 1) */}
            {!isDay && (
                <div className="stars-container">
                    <div className="star star-1"></div>
                    <div className="star star-2"></div>
                    <div className="star star-3"></div>
                    <div className="star star-4"></div>
                    <div className="star star-5"></div>
                    <div className="star star-6"></div>
                    <div className="star star-7"></div>
                    <div className="star star-8"></div>
                    <div className="star star-9"></div>
                    <div className="star star-10"></div>
                </div>
            )}

            <div className="cloud-decorations">
                {cloudLayers.map((cloud, index) => (
                    <img
                        key={index}
                        src={cloud.image}
                        className={`${cloud.className} cloud-speed-${cloud.speed}`}
                        style={{ 
                            transform: `scale(${cloud.scale})`,
                            opacity: cloud.opacity
                        }}
                        alt=""
                    />
                ))}
            </div>

            <h2>{props.location.name}, {props.location.country}</h2>
            <div className="current-details">
                <div className="condition-container">
                    <img
                        src={`https:${props.current.condition.icon}`}
                        alt={props.current.condition.text}
                        className="condition-icon"
                    />
                </div>
                <div className="temperature">
                    <h3>{props.current.temp_c}°C</h3>
                    <p>{props.current.condition.text}</p>
                </div>
                <div className="extra-info">
                    <p>Feels like: {props.current.feelslike_c}°C</p>
                    <p>Humidity: {props.current.humidity}%</p>
                    <p>Wind: {props.current.wind_kph} km/h</p>
                </div>
            </div>
        </div>
    );
}