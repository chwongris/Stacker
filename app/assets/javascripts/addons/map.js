var map;

var markers = [];

function initMap() {
 var myLatlng = new google.maps.LatLng(40.7509915, -73.9888797);

 var mapOptions = {
  center: myLatlng,
  zoom: 12,
  mapTypeControlOptions: {
    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
  }
};


var styles = [
{
  featureType: "road",
  elementType: "geometry",
  stylers: [
  { lightness: 100 },
  { visibility: "simplified" }
  ]
},{
  featureType: "road",
  elementType: "labels",
  stylers: [
  { visibility: "off" }
  ]
}
];

var styledMap = new google.maps.StyledMapType(styles,
  {name: "Styled Map"});

map = new google.maps.Map($("#map-canvas")[0],
  mapOptions);

map.mapTypes.set('map_style', styledMap);
map.setMapTypeId('map_style');



};

// map: an instance of google.maps.Map object
// latlng: an array of google.maps.LatLng objects


var latlng = [];

function addMarker(latitude, longitude, title, whatami) {
    var markerLatlng = new google.maps.LatLng(latitude, longitude);
    var markerSettings={
        position: markerLatlng,
        map: map,   
        title: title
      }
    //this way we still use the default marker when there is none set
    switch (whatami) {
        case 'park':
        markerSettings.icon = '/assets/parkmarker.png';
        break;

        case 'rest':
        markerSettings.icon = '/assets/restaurantmarker.png';
        break;

        case 'meetup':
        markerSettings.icon = '/assets/meetupmarker.png';
        break;
      }

  var marker = new google.maps.Marker(markerSettings);
  markers.push(marker);
  latlng.push(markerLatlng);
};





function zoomin(latlng){
var latlngbounds = new google.maps.LatLngBounds();
for (var i = 0; i < latlng.length; i++) {
  latlngbounds.extend(latlng[i]);
}
map.fitBounds(latlngbounds);
};
// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the overlays from the map, but keeps them in the array.
function clearOverlays() {
  setAllMap(null);
}

// Shows any overlays currently in the array.
function showOverlays() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteOverlays() {
  clearOverlays();
  markers = [];
}