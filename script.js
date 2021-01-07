window.onload = function(){

    getLocation()

    var coords = []

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
          
        } else { 
          x.innerHTML = "Geolocation is not supported by this browser.";
        }
        
      }
    function showPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
          coords = [lat, long]
          showMap(coords);
    }


    function showMap(coords) {

        L.mapquest.key = '0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j';

        // 'map' refers to a <div> element with the ID map
        let map = L.mapquest.map('map', {
        center: [coords[0], coords[1]],
        layers: L.mapquest.tileLayer('map'),
        zoom: 12
        });

}
