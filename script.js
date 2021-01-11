window.onload = function () {

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

  $.ajax({  
    url: "https://api.collectapi.com/gasPrice/stateUsaPrice?state=FL",
    method: 'GET',
    headers: {
      "authorization":"apikey 4q4IHx619b47CaX35Ji9xZ:0jz3gHaXHLos0Lj2yXBANg",
      "content-type":"application/json"
    }
  }).then(function(data){
    console.log("Gas Data" + JSON.stringify(data))
  });
    
  }
  $.ajax({
    headers: { "Accept": "application/json"},
    type: 'GET',
    url: 'https://cors-proxy.htmldriven.com/?url=https://cl.ly/2wr4',
    crossDomain: true,
    beforeSend: function(xhr){
        xhr.withCredentials = true;
  },
    success: function(data, textStatus, request){
        console.log(data);
    }
});
  function showMap(coords) {

    L.mapquest.key = '0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j';

    // 'map' refers to a <div> element with the ID map
    let map = L.mapquest.map('map', {
      center: [coords[0], coords[1]],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12
    });

  }


// dropdown link movement when clicked 
document.getElementsByClassName("dropBtn").onclick = function() {drops()};

function drops() {
  document.getElementById("dropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(eL) {
  if (!eL.target.matches('.dropBtn')) {
  var dropdown = document.getElementById("dropdown");
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  }
}





