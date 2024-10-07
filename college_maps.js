let metroAreaCenterCoordinates = [44.96, -93.2]
let zoomLevel = 9 //zoom level for map - level 1 = the World, Level 20 = zoomed into city blocks

let map = L.map('college-map').setView(metroAreaCenterCoordinates, zoomLevel)

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap></a> contributors',
}).addTo(map); //adds the tile layer to the map for displaying

//How to add data without including it as an array

//let mctcCoordinates = [44.9724, -93.2844]
//let mctcMarker = L.marker(mctcCoordinates).bindPopup('Minneapolis College<br>'
// '<a href=https://minneapolis.edu">Website</a>').addTo(map)
//let stPaulCoordinates = [44.9483, -93.1899]
//let stPaulMarker = L.marker(stPaulCoordinates).bindPopup('Saint Paul College<br>'
// '<a href="https://saintpaul.edu">Website</a>').addTo(map)
//let normandaleCoordinates = [44.8297, -93.3312]
//let normandaleMarker = L.marker(normandaleCoordinates).bindPopup('Normandale Community College<br>' +
// '<a href="http://www.normandale.edu/">Website</a>').addTo(map)


//Data array for easy use

campuses =  [
    {"name": "Minneapolis College", "website": "https://minneapolis.edu", "coordinates": [44.9724, -93.2844] },
    {"name": "Saint Paul College", "website": "https://saintpaul.edu", "coordinates": [44.94839, -93.1099] },
    {"name": "Normandale Community College", "website": "https://normandale.edu", "coordinates": [44.8297, -93.3312] },
    {"name": "North Hennepin Community College", "website": "https://nhcc.edu", "coordinates": [45.1054232,-93.3767558] },
    {"name": "Century College", "website": "https://www.century.edu/", "coordinates": [45.0438494,-92.9862026] }
]

//Draw a marker for each college campus
campuses.forEach(function(collegeCampus) {
    L.marker(collegeCampus.coordinates).bindPopup(`${collegeCampus.name}<br><a href="${collegeCampus.website}">
Website</a>`).addTo(map)
})

//Opaque circle to encapsulate the campus locations
campusLocations = []
let metroAreaCircle = L.circle(metroAreaCenterCoordinates, {
    color: 'green',
    fillOpacity: 0.1,
    radius: 30000
}).bindPopup('Twin Cities Metro Area').addTo(map)

