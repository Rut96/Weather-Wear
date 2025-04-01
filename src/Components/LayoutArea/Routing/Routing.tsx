import { Navigate, Route, Routes } from "react-router-dom";
import { Page404 } from "../Page404/Page404";
import "./Routing.css";
import { Weather } from "../../PagesArea/Weather/Weather";

export function Routing(): JSX.Element {

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />

                <Route path="/home" element={<Weather />} />

                <Route path="*" element={<Page404 />} />
            </Routes>
        </div>
    );
}
