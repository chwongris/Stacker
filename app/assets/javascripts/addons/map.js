var map;

var markers = [];

function initMap() {
 var myLatlng = new google.maps.LatLng(40.7409915, -74.0098797);

 var mapOptions = {
  center: myLatlng,
  zoom: 12,
  mapTypeControlOptions: {
    mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
  },
  zoomControl: true,
  zoomControlOptions: {
  style: google.maps.ZoomControlStyle.SMALL,
  position: google.maps.ControlPosition.TOP_RIGHT
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

function addMarker(latitude, longitude, title, whatami, info) {
    var markerLatlng = new google.maps.LatLng(latitude, longitude);
    var markerSettings={
        position: markerLatlng,
        map: map,   
        title: title,
        animation: google.maps.Animation.DROP
      }
    //this way we still use the default marker when there is none set
    switch (whatami) {
        case 'concert':
        markerSettings.icon = '/assets/concertmarker.png';
        break;

        case 'Restaurants':
        markerSettings.icon = '/assets/restaurantmarker2.png';
        break;

        case 'Bars':
        markerSettings.icon = '/assets/barmarker.png';
        break;

        case 'DanceClubs':
        markerSettings.icon = '/assets/nightlifemarker.png';
        break;
      }

  var marker = new google.maps.Marker(markerSettings);

  var infowindow = new google.maps.InfoWindow({
    content: ""
  });

  infowindow.content = info;

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(18);
    map.setCenter(marker.getPosition());
    map.panBy(-220, 0);
    infowindow.open(map,marker);
  });

  markers.push(marker);
  latlng.push(markerLatlng);
};





function zoomin(latlng){
var latlngbounds = new google.maps.LatLngBounds();
for (var i = 0; i < latlng.length; i++) {
  latlngbounds.extend(latlng[i]);
}
map.fitBounds(latlngbounds);
map.panBy(-200, 0);
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

google.maps.event.addDomListener(window, 'load', initialize);