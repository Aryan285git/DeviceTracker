const socket=io();

if(navigator.geoloaction){
    navigator.geolocation.watchPosition((position)=>{
        const{latitude,longitude}=position.coords;
        socket.emit("send-location",{latitude,longitude});
        socket.emit("send-location",{
            latitude,
            longitude
    }},(error)=>{
        console.error(error)
    },
    {
       enableHighAccuracy:true,
       timeout:5000
       maximumAge:0,
    }
    );
}
L.map("map").setView([0,0],10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:'Aryan Singh',
}
).addTo(map)

const markers={};

socket.on("receive-location", (data)=>{
    const{id, latitude, longitude}=data;
    map.setView([latitude, longitude], 16);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        const marker=L.marker([latitude, longitude]).addTo(map);
        markers[id]=marker;
    }
});

socket.on("user-disconnected", (userId)=>{
    if(markers[userId]){
        map.removeLayer(markers[userId]);
        delete markers[userId];
    }
});