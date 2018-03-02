function initMap() {
  // 43.202348,27.9096177,17z
  var uluru = {lat: 43.202348, lng: 27.9096177};
  var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 17,
  center: uluru
  });
  var marker = new google.maps.Marker({
  position: uluru,
  map: map
  });
}