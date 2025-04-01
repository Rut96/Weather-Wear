import { useEffect, useState } from "react";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    const [isDay, setIsDay] = useState<boolean>(true);
    
    useEffect(() => {
        // Check if it's day or night
        const checkDayTime = () => {
            const hours = new Date().getHours();
            setIsDay(hours >= 6 && hours < 19); 
        };
        
        checkDayTime();
        
        const interval = setInterval(checkDayTime, 1000 * 60 * 60);
        
        return () => clearInterval(interval);
    }, []);
    
    return (
        <div className={`Layout ${isDay ? 'day-mode' : 'night-mode'}`}>
            <div className="background-gradient"></div>
            
            {/* Stars for night mode */}
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
                <div className="star star-11"></div>
                <div className="star star-12"></div>
                <div className="star star-13"></div>
                <div className="star star-14"></div>
                <div className="star star-15"></div>
            </div>
            
            <main>
                <Routing />
            </main>
        </div>
    );
}