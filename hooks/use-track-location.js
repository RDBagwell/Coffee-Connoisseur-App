import { useState } from "react";

export default function useTrackLocation(){

    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    
    const success = (postion)=>{
        const latitude = postion.coords.latitude;
        const longitude = postion.coords.longitude;
        setLatLong(`${latitude},${longitude}`);
        setLocationErrorMsg('');
        setIsFindingLocation(false);
    };
    
    const error = ()=>{
        setIsFindingLocation(false);
        setLocationErrorMsg("Can not find your location.");
        setIsFindingLocation(false);
    }

    const hanleTrackLocation = ()=>{
        setIsFindingLocation(true);
        if(!navigator.geolocation){
            setIsFindingLocation(false);
            setLocationErrorMsg("Geolocation is not supported by your browser");
        } else{
            // status.texContent = "Locating...";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
    return {
        latLong,
        locationErrorMsg,
        isFindingLocation,
        hanleTrackLocation
    }
}