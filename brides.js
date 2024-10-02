

//Minnesota coordinates
let mapCenter =[45, -93]

let zoomLevel = 15 //how much we're zoomed in or out of the map

//Creates the map
let bridgeMap = L.map('bridge-map').setView(mapCenter, zoomLevel)
    
//Tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(bridgeMap)


//Bridges stored as array for easier access
let bridgelist = [
    {   name: 'Golden Gate Bridge', 
        location: 'San Francisco and Marin, CA', 
        span: '1280.2', 
        coordinates: [40.6066, -74.0447]},
    
]

bridgelist.forEach(function (bridgeObject) {
    let bridgeName = bridgeObject.name
    let bridgeCoordinates = bridgeObject.coordinates

    let bridgeMarker = L.marker(bridgeCoordinates)
    bridgeMarker.addTo(bridgeMap)

})