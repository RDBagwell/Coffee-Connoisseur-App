import { useContext, useState } from "react";

import {ACTION_TYPES, storeContext} from "../pages/_app";

export default function useTrackLocation(){

    const [locationErrorMsg, setLocationErrorMsg] = useState('');
    // const [latLong, setLatLong] = useState('');
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    
    const {dispatch} = useContext(storeContext);

    const success = (postion)=>{
        const latitude = postion.coords.latitude;
        const longitude = postion.coords.longitude;
        // setLatLong(`${latitude},${longitude}`);
        dispatch({
            type: ACTION_TYPES.SET_LAT_LONG,
            payload: {latLong: `${latitude},${longitude}`}
        });
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
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    return {
        // latLong,
        locationErrorMsg,
        isFindingLocation,
        hanleTrackLocation
    }
}