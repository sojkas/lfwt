import React, { useEffect, useRef, useState } from "react";

interface IMarker {
  name: string;
  latitude: number;
  longitude: number;
}

type GoogleMapLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;
type GoogleMarker = google.maps.Marker;

const Gmap: React.FC<{ circleAvailable: boolean }> = (props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const [marker, setMarker] = useState<IMarker>();
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
    setMarker({
      name: "Marker",
      latitude: coordinate.lat(),
      longitude: coordinate.lng(),
    });
  };

  useEffect(() => {
    if (marker) {
      addMarker(new google.maps.LatLng(marker.latitude, marker.longitude));
      if (circleAvailable) {
        addCircle(new google.maps.LatLng(marker.latitude, marker.longitude));
      }
    }
  }, [marker]);

  const addMarker = (location: GoogleMapLatLng): void => {
    const marker: GoogleMarker = new google.maps.Marker({
      position: location,
      map: map,
    });
  };

  const addCircle = (location: GoogleMapLatLng): void => {
    setCircleAvailable(true);
    const circle: google.maps.Circle = new google.maps.Circle({
      strokeColor: "#34342C",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#B0AF5E",
      fillOpacity: 0.35,
      map,
      center: location,
      radius: 1 * 1000,
    });
  };

  return (
    <div className="map-container">
      <div ref={mapRef} className="map-container__map"></div>
    </div>
  );
};

export default Gmap;
