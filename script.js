window.onload = function () {

  // getLocation()
  // findCoords()

  var pricesArray = []
  var cityArray = []
  var priceObj = []
  var newCity = {}
  $(".button").on("click", function(e){
    e.preventDefault()

    searchValue = $("#cityInput").val()
    console.log(searchValue)
    findCoords(searchValue);
  })
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
  
    function findGas(coords) {
      console.log(coords.lat.toString())
      console.log(coords.lng.toString())
        $.ajax({  
          url: "https://api.tomtom.com/search/2/search/gas.json?key=XnrK8y24URJ9AN4yfG0N3gMNsB26c3HU&lat=" + coords.lat + "&lon=" + coords.lng,
          // url: "https://cors-escape.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Gas%20Station&inputtype=textquery&locationbias=circle:200@" + coords.lat + "," +  coords.lng + "&key=AIzaSyBCx0c41Dp-KbTZAAOntiA2ka7nZyE4gDQ",
          // url: "http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=" + coords[0] +"," + coords[1],
          method: 'GET',
        }).then(function(data){
          for (i in data.results) {

          }
          
      })
    }

  function pins(cities){
    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=" + cities,
      // url: "http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=" + coords[0] +"," + coords[1],
      method: 'GET',
    }).then(function(data){
      newCity = data.results[0].locations[0].latLng
      cityArray.push(newCity)
      console.log(newCity)
      showMap()

      
  })}

  function findCoords(searchValue) {

    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=" + searchValue,
      // url: "http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=" + coords[0] +"," + coords[1],
      method: 'GET',
    }).then(function(data){
      console.log(data)
      var state = data.results[0].locations[0].adminArea3
      var coords = data.results[0].locations[0].latLng
      showMap(coords)
      findGas(coords)
      fis(state)
    });
  }
  

  // function findCities(coords) {

  //   $.ajax({  
  //     url: 'https://api.allorigins.win/get?url=' + encodeURIComponent("http://www.mapquestapi.com/search/v2/radius?radius=50&key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&maxMatches=4&origin=" + coords[0] +"," + coords[1]),
  //     // url: "http://www.mapquestapi.com/search/v2/radius?key=KEY&maxMatches=4&origin=" + coords[0] +"," + coords[1],
  //     method: 'GET',
  //   }).then(function(data){
  //     console.log(data)
  //   });
  // }
  

  function fis(state){
  $.ajax({  
    // url: 'https://api.allorigins.win/get?url=' + encodeURIComponent("http://api.mygasfeed.com/stations/radius/Lat=" + coords[0] + "/Lng=" + coords[1] + "/ylav87lih0.json"),
    url: "https://api.collectapi.com/gasPrice/stateUsaPrice?state=" + state,
    method: 'GET',
    headers: {
      "authorization":"apikey 4q4IHx619b47CaX35Ji9xZ:0jz3gHaXHLos0Lj2yXBANg",
      "content-type":"application/json"
    }
  }).then(function(data){
    console.log(data.result.cities)
    for (i in data.result.cities) {
      var prices = {
        city: data.result.cities[i].name,
        price: parseFloat(data.result.cities[i].gasoline)
      }

      priceObj.push(prices)

      cityArray.push(prices.city)

      pricesArray.push(prices.price)
      // prices.sort( (a,b) => b - a)
      console.log(prices)
    }
    priceObj.sort(function(a, b) {
      return a.price - b.price;
    })

    priceObj.splice(10)
    
    for (i in priceObj) {
      var content = $("<h3>")
      content.text(priceObj[i].city + ": $" + priceObj[i].price + "/gal")
      $(".name").append(content)
      pins(priceObj[i].city)
    }

    console.log(priceObj)
    // console.log(pricesArray)
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
      zoom: 6
    });
    console.log(cityArray)
    // for (i in cityArray) {
    //   L.marker([cityArray[i]..lat, coords.lng], {
    //     icon: L.mapquest.icons.marker(),
    //     draggable: false
    //   }).bindPopup([coords.lat, coords.lng]).addTo(map);
    // }
    
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





