mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', 
    style: "mapbox://style/mapbox/streets-v11",
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});
const marker = new mapboxgl.Marker({color: "red"})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({offset: 10}))
    .addTo(map);