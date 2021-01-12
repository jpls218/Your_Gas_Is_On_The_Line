window.onload = function () {

  // Initializing variables to use later 
  let map
  var cityArray = []
  var priceObj = []
  var newCity = {}

  // When submit is clicked 
  $(".button").on("click", function(e){
    e.preventDefault()

    // Get value of user input 
    searchValue = $("#cityInput").val()
    findCoords(searchValue);
  })

  // Call to Mapquest api
  function pins(cities){
    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=" + cities,

      method: 'GET',

    }).then(function(data){

      // Gets lat and lng from retrieved data
      newCity = data.results[0].locations[0].latLng

      // Stores object in array 
      cityArray.push(newCity)

      showPins()   
  })}

  // Call to Mapquest api
  function findCoords(searchValue) {
    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=" + searchValue,

      method: 'GET',
    }).then(function(data){

      // Gets the state name from data 
      var state = data.results[0].locations[0].adminArea3

      // Gets coordinates from data 
      var coords = data.results[0].locations[0].latLng

      // Function calls 
      showMap(coords)
      fis(state)
    });
  }

  // Call to Collect Api which contains gas prices 
  function fis(state){
  $.ajax({  
    url: "https://api.collectapi.com/gasPrice/stateUsaPrice?state=" + state,

    method: 'GET',

    headers: {
      "authorization":"apikey 4q4IHx619b47CaX35Ji9xZ:0jz3gHaXHLos0Lj2yXBANg",
      "content-type":"application/json"
    }
  }).then(function(data){

    // Runs through each returned city 
    for (i in data.result.cities) {

      // Creates object containing the city and its respective gas price 
      var prices = {
        city: data.result.cities[i].name,
        price: parseFloat(data.result.cities[i].gasoline)
      }

      // Pushes each object to array 
      priceObj.push(prices)
    }

    // Sorts array by gas price 
    priceObj.sort(function(a, b) {
      return a.price - b.price;
    })

    // Only gets first 10 in array
    priceObj.splice(10)
    
    // Runs through each in array 
    for (i in priceObj) {

      // Creates new h3 tag 
      var content = $("<h3>")

      // Sets its text to the city name and gas price 
      content.text(priceObj[i].city + ": $" + priceObj[i].price + "/gal")

      // Appends to HTML div 
      $(".name").append(content)
      
      pins(priceObj[i].city)
    }
  });
}

  // Takes coordinates from findCoords() function 
  function showMap(coords) {

    // Mapquest API key 
    L.mapquest.key = '0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j';

    // Creates map and appends it to screen 
    map = L.mapquest.map('map', {
      center: [coords.lat, coords.lng],
      layers: L.mapquest.tileLayer('map'),
      zoom: 6
    })
    
  }

  function showPins(){
    
    // Runs through each in the array of cities 
    for (i in cityArray) {

      // Gets the coordinates from each city from gas list and creates a pin on map
      L.marker([cityArray[i].lat, cityArray[i].lng], {
        icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup([cityArray[i].lat, cityArray[i].lng]).addTo(map);
    }
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



}

