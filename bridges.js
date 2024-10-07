

//Minnesota coordinates
let mapCenter =[41.5, -95.0]

let zoomLevel = 3.54//how much we're zoomed in or out of the map when page is loaded

//Creates the map
let bridgeMap = L.map('bridge-map').setView(mapCenter, zoomLevel)
    
//Tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copywrite">OpenStreetMap</a>',
}).addTo(bridgeMap)


//Bridges stored as array for easier access
let bridgelist = [
    
    {   name: 'Verrazano-Narrows Bridge', //The longest bridge on this list - will be shown as different color
        location: 'New York City, NY',
        span: '1298.4',
        coordinates: [40.6066, -74.0447]},
    
    {   name: 'Golden Gate Bridge', 
        location: 'San Francisco and Marin, CA', 
        span: '1280.2', 
        coordinates: [37.8199, -122.4783]},
    
    {   name: 'Mackinac Bridge',
        location: 'Mackinaw and St Ignace, MI',
        span: '1158.0',
        coordinates: [45.8174, -84.7278]},
    
    {   name: 'George Washington Bridge',
        location: 'New York City, NY and New Jersey',
        span: '1067.0',
        coordinates: [40.8517, -73.9527]},
    
    {   name: 'Tacoma Narrows Bridge',
        location: 'Tacoma and Kitsap, WA',
        span: '853.44',
        coordinates: [47.2690, -122.5587]},
    
    
]

//Longest Bridge icon
let longestBridgeIcon = L.icon({
    iconUrl: 'bridge-icon-2.png',
    iconSize: [40, 30],
    iconAnchor: [15, 20],
    popupAnchor: [0, -30]
})

//Find the longest bridge through span
let longestBridge = bridgelist.reduce(function (prev, current) {
    return(parseFloat(prev.span) > parseFloat(current.span)) ? prev : current
})

bridgelist.forEach(function (bridgeObject) {
    let bridgeName = bridgeObject.name
    let bridgeLocation = bridgeObject.location
    let bridgeSpan = bridgeObject.span
    let bridgeCoordinates = bridgeObject.coordinates

    //Custom icon for bridges
    let bridgeIcon = L.icon({
        iconUrl: 'bridge-icon-1.png',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    })
    
    //Longest bridge custom icon
    let icon = (bridgeObject.name === longestBridge.name) ? longestBridgeIcon : bridgeIcon;

    //create markers at each bridge coordinates
    let bridgeMarker = L.marker(bridgeCoordinates, {icon: icon});
    
    //Add marker to the map
    bridgeMarker.addTo(bridgeMap)
    
    //Popups for bridge details
    bridgeMarker.bindPopup(
        `<b>${bridgeName}</b><br>Location: ${bridgeLocation}</br> Span: ${bridgeSpan} meters`)

    
})

let bridgeNames = bridgelist.map(bridge => bridge.name);
let bridgeSpans = bridgelist.map(bridge => parseFloat(bridge.span)) //Convert spans to numbers

//Canvas context for the chart
let ctx = document.getElementById('bridgeChart').getContext('2d');

//Creates the bar chart
let bridgeChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: bridgeNames, //labels are the bridge names
        datasets: [{
            label: 'Span (meters)',
            data: bridgeSpans, //Spans are the data for the chart
            backgroundColor: 'rgba(0, 51, 102, 0.4)',
            borderColor: 'rgba(0, 51, 102, 1)',
            borderWidth: 1
        }]
    },
    options: {
        indexAxis: 'y', //creates a horizontal bar chart
        plugins: {
            title: {
                display: true,
                text: 'Longest Bridges based on their Spans', //Adds a title for the table
                font: {
                    size: 18
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
