import { useEffect, useState } from "react";
import "./ClothingRecommendation.css";
import { WeatherResponseModel } from "../../../Models/WeatherResponseModel";

import heavyWinterCoat from '../../../Assets/Images/clothes/heavy-winter-coat-with-thermal-layer.jpg'
import winterCoat from '../../../Assets/Images/clothes/winter-coat-with-sweater.jpg'
import heavySweater from '../../../Assets/Images/clothes/heavy-sweater.jpg'
import lightJacket from '../../../Assets/Images/clothes/light-jacket.jpg'
import longSleeveShirt from '../../../Assets/Images/clothes/long-sleeve-shirt.jpg'
import Tshirt from '../../../Assets/Images/clothes/T-shirt.jpg'
import lightShirt from '../../../Assets/Images/clothes/light-shirt.jpg'
import breathableShirt from '../../../Assets/Images/clothes/breathable-shirt.avif'

import thickThermalJeans from '../../../Assets/Images/clothes/thick-jeans-with-thermal-underwear.jpg'
import thickJeans from '../../../Assets/Images/clothes/thick-jeans.jpeg'
import longPants from '../../../Assets/Images/clothes/long-pants.webp'
import lightPants from '../../../Assets/Images/clothes/light-pants.webp'
import shorts from '../../../Assets/Images/clothes/shorts.jpeg'


export interface ClothingRecommendation {
    top: string;
    bottom: string;
    accessories: string[];
    description: string;

    topImage: string;
    bottomImage: string;
    accessoryImages: Record<string, string>;
}

interface ClothingRecommendationProps {
    weatherData: WeatherResponseModel;
    inPopup?: boolean;
}

const clothingImages: {
    tops: Record<string, string>;
    bottoms: Record<string, string>;
    accessories: Record<string, string>;
} = {
    tops: {
        "Heavy winter coat with thermal layer": heavyWinterCoat,
        "Winter coat with sweater": winterCoat,
        "Medium jacket or heavy sweater": heavySweater,
        "Light jacket or sweater": lightJacket,
        "Long sleeve shirt, optional light sweater": longSleeveShirt,
        "T-shirt, optional light overshirt": Tshirt,
        "Light, breathable shirt": lightShirt,
        "Very light, loose-fitting, breathable shirt": breathableShirt
    },
    bottoms: {
        "Thick pants/jeans with thermal underwear": thickThermalJeans,
        "Thick pants/jeans": thickJeans,
        "Long pants": longPants,
        "Light pants or jeans": lightPants,
        "Light pants or shorts": shorts,
        "Shorts or light pants": shorts,
        "Shorts": shorts
    },
    accessories: {
        "Warm hat": "/images/accessories/warm-hat.png",
        "Insulated gloves": "/images/accessories/insulated-gloves.png",
        "Thick scarf": "/images/accessories/thick-scarf.png",
        "Warm boots": "/images/accessories/warm-boots.png",
        "Hat": "/images/accessories/hat.png",
        "Gloves": "/images/accessories/gloves.png",
        "Scarf": "/images/accessories/scarf.png",
        "Light gloves": "/images/accessories/light-gloves.png",
        "Light scarf": "/images/accessories/light-scarf.png",
        "Umbrella": "/images/accessories/umbrella.png",
        "Waterproof jacket": "/images/accessories/waterproof-jacket.png",
        "Waterproof boots": "/images/accessories/waterproof-boots.png",
        "Waterproof gloves": "/images/accessories/waterproof-gloves.png",
        "Windbreaker": "/images/accessories/windbreaker.png",
        "Sunglasses": "/images/accessories/sunglasses.png",
        "Sunscreen": "/images/accessories/sunscreen.png",
        "Wide-brimmed hat": "/images/accessories/wide-brim-hat.png"
    }
};

export function ClothingRecommendation({ weatherData, inPopup = false }: ClothingRecommendationProps): JSX.Element {
    const [recommendation, setRecommendation] = useState<ClothingRecommendation>(null);
    const [isExpanded, setIsExpanded] = useState<boolean>(inPopup);

    useEffect(() => {
        if (weatherData) {
            const newRecommendation = getClothingRecommendation(weatherData);
            setRecommendation(newRecommendation);
        }
    }, [weatherData]);

    function getClothingRecommendation(weatherData: WeatherResponseModel): ClothingRecommendation {
        const current = weatherData.current;
        const feelsLikeTemp = current.feelslike_c;
        const isRaining = current.precip_mm > 0 || current.condition.text.toLowerCase().includes('rain');
        const isSnowing = current.condition.text.toLowerCase().includes('snow');
        const isWindy = current.wind_kph > 20;
        const humidity = current.humidity;
        const uv = current.uv;

        let recommendation: ClothingRecommendation = {
            top: "",
            bottom: "",
            accessories: [],
            description: "",

            topImage: "",
            bottomImage: "",
            accessoryImages: {}
        };

        if (feelsLikeTemp < 0) {
            recommendation.top = "Heavy winter coat with thermal layer";
            recommendation.bottom = "Thick pants/jeans with thermal underwear";
            recommendation.accessories.push("Warm hat", "Insulated gloves", "Thick scarf", "Warm boots");
            recommendation.description = "It feels freezing outside! Bundle up with multiple warm layers.";
        } else if (feelsLikeTemp < 5) {
            recommendation.top = "Winter coat with sweater";
            recommendation.bottom = "Thick pants/jeans";
            recommendation.accessories.push("Hat", "Gloves", "Scarf");
            recommendation.description = "It feels very cold. Wear warm layers and cover extremities.";
        } else if (feelsLikeTemp < 10) {
            recommendation.top = "Medium jacket or heavy sweater";
            recommendation.bottom = "Long pants";
            recommendation.accessories.push("Light gloves", "Light scarf");
            recommendation.description = "It feels quite cold. A good jacket is essential.";
        } else if (feelsLikeTemp < 15) {
            recommendation.top = "Light jacket or sweater";
            recommendation.bottom = "Long pants";
            recommendation.description = "It feels cool. Layer up with a sweater and jacket.";
        } else if (feelsLikeTemp < 20) {
            recommendation.top = "Long sleeve shirt, optional light sweater";
            recommendation.bottom = "Light pants or jeans";
            recommendation.description = "It feels mild. A long-sleeve shirt should be comfortable.";
        } else if (feelsLikeTemp < 25) {
            recommendation.top = "T-shirt, optional light overshirt";
            recommendation.bottom = "Light pants or shorts";
            recommendation.description = "It feels pleasant. Dress in light, comfortable clothing.";
        } else if (feelsLikeTemp < 30) {
            recommendation.top = "Light, breathable shirt";
            recommendation.bottom = "Shorts or light pants";
            recommendation.description = "It feels warm. Wear lightweight, breathable clothing.";
        } else {
            recommendation.top = "Very light, loose-fitting, breathable shirt";
            recommendation.bottom = "Shorts";
            recommendation.description = "It feels hot! Wear as little as comfortably possible with lightweight fabrics.";
        }

        if (isRaining) {
            recommendation.accessories.push("Umbrella", "Waterproof jacket");
            recommendation.description += " Be prepared for rain with waterproof outer layers.";
        }

        if (isSnowing) {
            recommendation.accessories.push("Waterproof boots", "Waterproof gloves");
            recommendation.description += " Protect against snow with waterproof footwear and gloves.";
        }

        if (isWindy) {
            recommendation.accessories.push("Windbreaker");
            recommendation.description += " It's windy, so wear close-fitting clothing or a windbreaker.";
        }

        if (feelsLikeTemp > 20 && humidity > 70) {
            recommendation.description += " High humidity will make it feel sticky - choose very breathable fabrics.";
        }

        if (uv >= 6) {
            recommendation.accessories.push("Sunglasses", "Sunscreen", "Wide-brimmed hat");
            recommendation.description += " Protect yourself from strong UV rays with sun protection.";
        } else if (uv >= 3) {
            recommendation.accessories.push("Sunscreen", "Hat");
            recommendation.description += " Don't forget sun protection.";
        }

        // Set images for recommendations
        recommendation.topImage = recommendation.top in clothingImages.tops
            ? clothingImages.tops[recommendation.top]
            : "";
        recommendation.bottomImage = recommendation.bottom in clothingImages.bottoms
            ? clothingImages.bottoms[recommendation.bottom]
            : "";

        // Set images for accessories
        recommendation.accessories.forEach(accessory => {
            recommendation.accessoryImages[accessory] = accessory in clothingImages.accessories
                ? clothingImages.accessories[accessory]
                : "";
        });

        return recommendation;
    };




    const getClothingIcon = (feelsLikeTemp: number): string => {
        if (feelsLikeTemp < 5) {
            return "❄️"; // Cold
        } else if (feelsLikeTemp < 15) {
            return "🧥"; // Cool
        } else if (feelsLikeTemp < 25) {
            return "👕"; // Warm
        } else {
            return "🌞"; // Hot
        }
    };

    const toggleExpand = () => {
        if (!inPopup) {
            setIsExpanded(!isExpanded);
        }
    };

    if (!recommendation) {
        return null;
    }

    const clothingIcon = getClothingIcon(weatherData.current.feelslike_c);
    const currentTemp = Math.round(weatherData.current.temp_c);

    return (
        // <div className={`ClothingRecommendation ${inPopup ? 'in-popup' : ''}`}>
        //     <div className="recommendation-header" onClick={toggleExpand}>
        //         <div className="recommendation-title">
        //             <span className="clothing-icon">{clothingIcon}</span>
        //             <h2>What to Wear Today ({currentTemp}°C)</h2>
        //         </div>
        //         {!inPopup && (
        //             <button className={`expand-button ${isExpanded ? 'expanded' : ''}`}>
        //                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        //                     <path d="M7 10l5 5 5-5z" />
        //                 </svg>
        //             </button>
        //         )}
        //     </div>

        //     <div className={`recommendation-content ${isExpanded || inPopup ? 'expanded' : ''}`}>
        //         <p className="description">{recommendation.description}</p>

        //         <div className="clothing-items">
        //             <div className="clothing-item">
        //                 <h3>Top</h3>
        //                 <p>{recommendation.top}</p>
        //             </div>
        //             <div className="clothing-item">
        //                 <h3>Bottom</h3>
        //                 <p>{recommendation.bottom}</p>
        //             </div>
        //         </div>

        //         {recommendation.accessories.length > 0 && (
        //             <div className="accessories">
        //                 <h3>Accessories</h3>
        //                 <ul>
        //                     {recommendation.accessories.map((item, index) => (
        //                         <li key={index}>
        //                             <span className="accessory-bullet">•</span>
        //                             {item}
        //                         </li>
        //                     ))}
        //                 </ul>
        //             </div>
        //         )}
        //     </div>
        // </div>

        <div className={`ClothingRecommendation ${inPopup ? 'in-popup' : ''}`}>
            <div className="recommendation-header" onClick={toggleExpand}>
                <div className="recommendation-title">
                    <span className="clothing-icon">{clothingIcon}</span>
                    <h2>What to Wear Today ({currentTemp}°C)</h2>
                </div>
                {!inPopup && (
                    <button className={`expand-button ${isExpanded ? 'expanded' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path d="M7 10l5 5 5-5z" />
                        </svg>
                    </button>
                )}
            </div>

            <div className={`recommendation-content ${isExpanded || inPopup ? 'expanded' : ''}`}>
                <p className="description">{recommendation.description}</p>

                <div className="clothing-items">
                    <div className="clothing-item">
                        <h3>Top</h3>
                        <div className="item-with-image">
                            {recommendation.topImage && (
                                <div className="item-image-container">
                                    <img src={recommendation.topImage} alt={recommendation.top} className="item-image" />
                                </div>
                            )}
                            <p>{recommendation.top}</p>
                        </div>
                    </div>
                    <div className="clothing-item">
                        <h3>Bottom</h3>
                        <div className="item-with-image">
                            {recommendation.bottomImage && (
                                <div className="item-image-container">
                                    <img src={recommendation.bottomImage} alt={recommendation.bottom} className="item-image" />
                                </div>
                            )}
                            <p>{recommendation.bottom}</p>
                        </div>
                    </div>
                </div>

                {recommendation.accessories.length > 0 && (
                    <div className="accessories">
                        <h3>Accessories</h3>
                        <ul className="accessories-list">
                            {recommendation.accessories.map((item, index) => (
                                <li key={index}>
                                    {recommendation.accessoryImages[item] && (
                                        <div className="accessory-image-container">
                                            <img src={recommendation.accessoryImages[item]} alt={item} className="accessory-image" />
                                        </div>
                                    )}
                                    <span className="accessory-name">
                                        <span className="accessory-bullet">•</span>
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}