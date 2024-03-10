import React, { useState, useEffect } from "react";
import GoogleMapReact from 'google-map-react';
import { ImAccessibility } from "react-icons/im";

// Define types for the AnyReactComponent props
interface AnyReactComponentProps {
    text: string;
}

const AnyReactComponent: React.FC<AnyReactComponentProps> = ({ text }) => (
    <div className="flex column align-center">
        <ImAccessibility size="22" className="map-house-icon" />
        <div className="flex column text-center fs12">{text}</div>
    </div>
);

// Define types for the SimpleMap props
interface SimpleMapProps {
    lat?: number;
    lng?: number;
    marker?: string;
}

const API_KEY = 'AIzaSyBz93Z2K2skPTIXOHb9p5YiObRcQ64fTv0';

const SimpleMap: React.FC<SimpleMapProps> = ({ lat = 32.109333, lng = 34.855499, marker = '' }) => {
    if (lat < -90 || lat > 90) {
        lat = 0;
    }

    // State type is inferred based on the initial value
    const [mapCenter, setMapCenter] = useState({ lat: lat, lng: lng });

    useEffect(() => {
        // Simulate changing coordinates every 3 seconds (you can replace this with your data updating logic)
        const interval = setInterval(() => {
            setMapCenter({ lat: lat, lng: lng });
        }, 1000);

        return () => clearInterval(interval);
    }, [lat, lng]);

    return (
        <div style={{ height: '500px', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: API_KEY }}
                defaultCenter={{ lat: lat, lng: lng }}
                center={mapCenter}
                defaultZoom={11}
            >
                <AnyReactComponent
                    lat={mapCenter.lat}
                    lng={mapCenter.lng}
                    text={marker || ''}
                />
            </GoogleMapReact>
        </div>
    );
};

export default SimpleMap;


interface AnyReactComponentProps {
    text: string;
    lat: number;
    lng: number;
}