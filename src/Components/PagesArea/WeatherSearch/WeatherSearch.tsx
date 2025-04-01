import { useState } from "react";
import "./WeatherSearch.css";

type WeatherSearchProps = {
    onSearch: (city: string) => void;
    defaultCity?: string;
}

export function WeatherSearch(props: WeatherSearchProps): JSX.Element {
    const [searchCity, setSearchCity] = useState<string>('');

    function handleSearch() {
        if (searchCity.trim()) {
            props.onSearch(searchCity);
            setSearchCity('');
        }
    }

    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="WeatherSearch">
            <div className="search-box">
                <div className="search-field">
                    <input
                        type="text"
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter city name..."
                    />
                    <div className="search-box-icon">
                        <button className="btn-icon-content" onClick={handleSearch} aria-label="Search">
                            <i className="search-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                                </svg>
                            </i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}