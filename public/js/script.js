const socket = io();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    socket.emit("send-location", { latitude, longitude });
  }, (error) => {
    console.error(error);
    // You can add user-friendly error messages here (e.g., alert)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  });
}

const map = L.map("map").setView([0, 0], 10); // Declare map here

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>' // Correct attribution
}).addTo(map);

const markers = {};

socket.on("receive-location", (data) => { // Pass map as argument
  const { id, latitude, longitude } = data;
  map.setView([latitude, longitude], 16); // Use passed map object
  if (markers[id]) {
    markers[id].setLatLng([latitude, longitude]);
  } else {
    const marker = L.marker([latitude, longitude]).addTo(map);
    markers[id] = marker;
  }
});

socket.on("user-disconnected", (userId) => {
  if (markers[userId]) {
    map.removeLayer(markers[userId]);
    delete markers[userId];
  }
});