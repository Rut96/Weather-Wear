class AppConfig {

    public readonly baseUrl = process.env.REACT_APP_BASE_URL;
    public readonly apiKey = process.env.REACT_APP_MY_KEY;
    
    // Pre-constructed URL examples for reference
    public readonly defaultWeatherUrl = `${process.env.REACT_APP_BASE_URL}/forecast.json?key=${process.env.REACT_APP_KEY}&q=London&days=7&aqi=no&alerts=no`;
}

export const appConfig = new AppConfig();
