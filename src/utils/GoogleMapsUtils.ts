export const loadMapApi = () => {
    const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&language=cs`;
    const scritps = document.getElementsByTagName('script');

    for (let i=0; i<scritps.length;i++) {
        if (scritps[i].src.indexOf(mapUrl) === 0) {
            return scritps[i];
        }
    }

    const googleMapScript = document.createElement('script');
    googleMapScript.src = mapUrl;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);
    return googleMapScript;
}