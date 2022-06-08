import React, { useEffect, useRef, useState } from "react";
import Settings, {MapMarker, getBestLatitude, getBestLongitude} from "../models/settings";

type GoogleMapLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;


var listener: google.maps.MapsEventListener;

const Gmap: React.FC<{
  settings: Settings,
  allMarkers: MapMarker[];
  draggable: boolean;
  setPosition: (position: GoogleMapLatLng) => void;
  selectedMarker: (marker: MapMarker) => void;
}> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [allGoogleMarkers, setAllGoogleMarkers] = useState<GoogleMarker[]>([]);
  const [allGoogleCircles, setAllGoogleCircles] = useState<
    google.maps.Circle[]
  >([]);

  const startMap = (): void => {
    if (!map) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [map, props]);

  const defaultMapStart = (): void => {
    const defaultPlace = new google.maps.LatLng(getBestLatitude(props.settings), getBestLongitude(props.settings));
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
    for (let m of allGoogleMarkers!) {
      m.setMap(null);
    }
    for (let c of allGoogleCircles!) {
      c.setMap(null);
    }
    if (props.allMarkers.length > 0 && map) {
      for (let singleMarker of props.allMarkers) {
        addMarker(singleMarker);
        if (singleMarker.radius > 0) {
          addCircle(singleMarker);
        }
      }
    }
  };
  useEffect(drawMarkers, [map, props.allMarkers]);

  const initEventListener = (): void => {
    if (map) {
      listener?.remove();
      listener = google.maps.event.addListener(
        map,
        "click",
        function (event: google.maps.MapMouseEvent) {
          props.setPosition(event.latLng!);
        }
      );
    }
  };

  useEffect(initEventListener, [map, props.allMarkers]);

  /* const coordinatesToNamePlace = (coordinate: GoogleMapLatLng) => {
    /* console.log(isReadyToSetMarker);
    if (!isReadyToSetMarker) return; 
    setMarker({
      id: "MM"+Date.now()+Math.random().toString(),
      latitude: coordinate.lat(),
      longitude: coordinate.lng(),
      radius: 1
    });
  }; */

  /* useEffect(() => {    
    if (marker) {
      addMarker(marker);
      if (circleAvailable) {
        addCircle(marker);
      }
    }
  }, [marker]); */

  const addMarker = (mapMarker: MapMarker): void => {
    const googleMarker: GoogleMarker = new google.maps.Marker({
      position: new google.maps.LatLng(mapMarker.latitude, mapMarker.longitude),
      map: map,
      draggable: props.draggable,
    });

    allGoogleMarkers?.push(googleMarker);

    googleMarker.addListener("click", () => {
      props.selectedMarker(mapMarker);
    });
    if (props.draggable) {
      googleMarker.addListener("dragend", () => {
        props.setPosition(googleMarker.getPosition()!);
      });
    }
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
      /* draggable: true, */
      clickable: false,
    });
    /* circle.addListener("dragend", ()=> {
      props.setPosition(circle.getCenter()!);
    }) */
    allGoogleCircles?.push(circle);
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-container__map"></div>
    </div>
  );
};

export default Gmap;
