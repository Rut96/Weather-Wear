import { useEffect, useState } from "react";
import { WeatherResponseModel } from "../../../Models/WeatherResponseModel";
import { weatherService } from "../../../Services/WeatherService";
import { ClothingRecommendation } from "../ClothingRecommendation/ClothingRecommendation";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather";
import { WeatherForecast } from "../WeatherForecast/WeatherForecast";
import { WeatherSearch } from "../WeatherSearch/WeatherSearch";
import "./Weather.css";

import question from '../../../Assets/Images/question-mark-white.svg';
import cloudImage from '../../../Assets/Images/welcome-cloud.png';

export function Weather(): JSX.Element {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<WeatherResponseModel>(null);
    const [showClothingPopup, setShowClothingPopup] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (city.trim()) {
                try {
                    setLoading(true);
                    setError(null);
                    const fetchedWeather = await weatherService.getWeatherForecast(city);
                    setWeatherData(fetchedWeather);
                } catch (err: any) {
                    console.log(err.message);
                    setError("Couldn't find weather for this location. Please try another city.");
                    setWeatherData(null);
                } finally {
                    setLoading(false);
                }
            }
        })();
    }, [city]);

    function handleCitySearch(newCity: string) {
        setCity(newCity);
    }

    function toggleClothingPopup() {
        setShowClothingPopup(!showClothingPopup);
    }

    // Close popup when clicking outside of it
    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            setShowClothingPopup(false);
        }
    }

    return (
        <div className={`Weather ${weatherData ? 'has-data' : ''}`}>
            <h1>Weather Wear</h1>

            <div className="weather-nav">
                <WeatherSearch onSearch={handleCitySearch} />
                {weatherData && (
                    <div className="weather-actions">
                        <button className="clothing-button" onClick={toggleClothingPopup}>
                            What to Wear
                            <span className="clothing-icon">
                                <img src={question} alt="" />
                            </span>
                        </button>
                    </div>
                )}
            </div>

            {loading && (
                <div className="weather-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading weather data...</p>
                </div>
            )}

            {error && (
                <div className="weather-error">
                    <p>{error}</p>
                </div>
            )}

            {!city && !loading && (
                <div className="weather-welcome">
                    <div className="cloud-image-container">
                        <img src={cloudImage} alt="" className="cloud-image" />
                        <div className="cloud-content">
                            <div className="welcome-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 100 100"
                                    width="70"
                                    height="70"
                                >
                                    <path
                                        d="M20 50 L35 65 L45 30 L90 30"
                                        fill="none"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M65 45 L65 70"
                                        fill="none"
                                        strokeWidth="8"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                            <h2>Welcome to Weather Forecast!</h2>
                            <p>Enter a city name above to see the current weather and forecast.</p>
                        </div>
                    </div>
                </div>
            )}

            {weatherData && (
                <div className="weather-data">
                    <CurrentWeather
                        current={weatherData.current}
                        location={weatherData.location}
                    />

                    <WeatherForecast
                        forecastDays={weatherData.forecast.forecastday}
                    />
                </div>
            )}

            {showClothingPopup && weatherData && (
                <div className="popup-overlay" onClick={handleOverlayClick}>
                    <div className="popup-content">
                        <button className="close-button" onClick={toggleClothingPopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                        <ClothingRecommendation weatherData={weatherData} inPopup={true} />
                    </div>
                </div>
            )}
        </div>
    );
}