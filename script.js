window.onload = function () {

  // getLocation()
  findCoords()

  var coords = []

  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);

  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }

  // }
  // function showPosition(position) {
  //   var lat = position.coords.latitude;
  //   var long = position.coords.longitude;
  //   coords = [lat, long]
  //   showMap(coords);
  //   findGas(coords);
  //   findCities(coords);
  // }


  function findCoords() {

    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=Washington,DC",
      // url: "http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=" + coords[0] +"," + coords[1],
      method: 'GET',
    }).then(function(data){
      var coords = data.results[0].locations[0].latLng
      showMap(coords)
    });
  }
  
  http://open.mapquestapi.com/geocoding/v1/address?key=KEY&location=Washington,DC

  function findCities(coords) {

    $.ajax({  
      url: 'https://api.allorigins.win/get?url=' + encodeURIComponent("http://www.mapquestapi.com/search/v2/radius?radius=50&key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&maxMatches=4&origin=" + coords[0] +"," + coords[1]),
      // url: "http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=" + coords[0] +"," + coords[1],
      method: 'GET',
    }).then(function(data){
      console.log(data)
    });
  }
  

  function findGas(coords){
  $.ajax({  
    // url: 'https://api.allorigins.win/get?url=' + encodeURIComponent("http://api.mygasfeed.com/stations/radius/Lat=" + coords[0] + "/Lng=" + coords[1] + "/ylav87lih0.json"),
    url: "https://api.collectapi.com/gasPrice/stateUsaPrice?state=FL",
    method: 'GET',
    headers: {
      "authorization":"apikey 4q4IHx619b47CaX35Ji9xZ:0jz3gHaXHLos0Lj2yXBANg",
      "content-type":"application/json"
    }
  }).then(function(data){
    console.log(data)
  });
}
  }
//   $.ajax({
//     headers: { "Accept": "application/json"},
//     type: 'GET',
//     url: 'https://cors-proxy.htmldriven.com/?url=https://cl.ly/2wr4',
//     crossDomain: true,
//     beforeSend: function(xhr){
//         xhr.withCredentials = true;
//   },
//     success: function(data, textStatus, request){
//         console.log(data);
//     }
// });


// function findGas(coords) {
//   console.log("hello world")
//   $.ajax({
//     url: "http://api.mygasfeed.com/stations/radius/" + coords[0] + "/" + coords[1] + "/5/reg/ylav87lih0.json?",
//     dataType: "jsonp",
//     cors: true,
//     contentType: "application/json",
//     secure: true,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//     },
//     method: "GET"
//   }).then(function(response){
//     console.log(response)
//     console.log("hello world222")
//   })
// }
  function showMap(coords) {

    console.log(coords)
    L.mapquest.key = '0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j';

    // 'map' refers to a <div> element with the ID map
    let map = L.mapquest.map('map', {
      center: [coords.lat, coords.lng],
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





