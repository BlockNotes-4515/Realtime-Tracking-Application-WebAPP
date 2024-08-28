const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit('sendLocation', { latitude, longitude });
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution: "RC Basti,Block WZ RC बस्ती, ब्लॉक WZ Nangal Raya, Janakpuri New Delhi, Delhi",
}).addTo(map);

const markers ={}

socket.on('receive-location', (data) => {
    const { latitude, longitude, username } = data;
    map.setView([latitude, longitude]);
 /*   const marker = L.marker([latitude, longitude]).addTo(map);
    markers[username] = marker;
    marker.bindPopup(username);*/
    if(markers[id])
    {
        markers[id].setLaLang([latitude,longitude]);
    }
    else
    {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
} );

socket.on("user-disconnected", (id) => {
    if(markers[id])
    {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});