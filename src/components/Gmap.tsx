import React, { useEffect, useRef, useState } from "react";
import Settings, { DistributionArea, MapMarker } from "../models/settings";

type GoogleMapLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Gmap: React.FC<{
  settings: Settings;
  circleAvailable: boolean;
  allMarkers: MapMarker[];
}> = (props) => {

  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<MapMarker>();
  const [allMarker, setAllMarker] = useState<MapMarker[]>(props.allMarkers);
  const [circleAvailable, setCircleAvailable] = useState<boolean>();

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
      setCircleAvailable(props.circleAvailable);
    }
  };

  useEffect(startMap, [map, props]);

  const defaultMapStart = (): void => {
    const defaultPlace = new google.maps.LatLng(50.06983, 14.43713);
    initMap(13, defaultPlace);
  };

  const initMap = (zoomLevel: number, place: GoogleMapLatLng): void => {
    //pokud existuje ref.current
    if (mapRef.current) {
      setMap(
        new google.maps.Map(mapRef.current, {
          zoom: zoomLevel,
          center: place,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: true,
          scaleControl: true,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        })
      );
    }
    
  };

  const drawMarkers = () => {
    if (allMarker.length>0 && map) {
      console.log("kreslime markery");
      loadSavedMarkers();
    }
  }
  useEffect(drawMarkers,[map, props.allMarkers]);

  const initEventListener = (): void => {
    if (map) {
      google.maps.event.addListener(
        map,
        "click",
        function (event: google.maps.MapMouseEvent) {
          coordinatesToNamePlace(event.latLng!);
        }
      );
    }
  };

  useEffect(initEventListener, [map]);

  const coordinatesToNamePlace = (coordinate: GoogleMapLatLng) => {
    /* console.log(isReadyToSetMarker);
    if (!isReadyToSetMarker) return; */
    setMarker({
      id: "MM"+Date.now()+Math.random().toString(),
      latitude: coordinate.lat(),
      longitude: coordinate.lng(),
      radius: 1
    });
  };

  useEffect(() => {    
    if (marker) {
      addMarker(marker);
      if (circleAvailable) {
        addCircle(marker);
      }
    }
  }, [marker]);

  const loadSavedMarkers = () => {
    for (let singleMarker of allMarker) {
      addMarker(singleMarker);
      if (circleAvailable) {
        addCircle(singleMarker);
      }
    }
  }


  const addMarker = (mapMarker: MapMarker): void => {    
    const googleMarker: GoogleMarker = new google.maps.Marker({
      position: new google.maps.LatLng(mapMarker.latitude, mapMarker.longitude),
      map: map,
    });

    googleMarker.addListener("click", ()=>{
      console.log("toz jsi klikl na areu s id " + mapMarker.id + " ktery ma radius " + mapMarker.radius);
    });
  };

  const addCircle = (mapMarker: MapMarker): void => {
    const circle: google.maps.Circle = new google.maps.Circle({
      strokeColor: "#34342C",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#B0AF5E",
      fillOpacity: 0.35,
      map,
      center: new google.maps.LatLng(mapMarker.latitude, mapMarker.longitude),
      radius: mapMarker.radius * 1000,
    });
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-container__map"></div>
    </div>
  );
};

export default Gmap;
