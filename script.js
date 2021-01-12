window.onload = function () {


  let map
  var cityArray = []
  var priceObj = []
  var newCity = {}
  $(".button").on("click", function(e){
    e.preventDefault()

    searchValue = $("#cityInput").val()
    findCoords(searchValue);
  })

    function findGas(coords) {
        $.ajax({  
          url: "https://api.tomtom.com/search/2/search/gas.json?key=XnrK8y24URJ9AN4yfG0N3gMNsB26c3HU&lat=" + coords.lat + "&lon=" + coords.lng,

          method: 'GET',
        }).then(function(data){
          for (i in data.results) {

          }
          
      })
    }

  function pins(cities){
    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=" + cities,

      method: 'GET',
    }).then(function(data){
      newCity = data.results[0].locations[0].latLng
      cityArray.push(newCity)
      showPins()

      
  })}

  function findCoords(searchValue) {

    $.ajax({  
      url: "http://open.mapquestapi.com/geocoding/v1/address?key=0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j&location=" + searchValue,

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


  function fis(state){
  $.ajax({  
   
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
  });
}


  function showMap(coords) {

    console.log(coords)
    L.mapquest.key = '0GxkVNACX7ZbVYmlAotnqVBEvhPvDi1j';

    map = L.mapquest.map('map', {
      center: [coords.lat, coords.lng],
      layers: L.mapquest.tileLayer('map'),
      zoom: 6
    })
 
    
    
    
    
  }

  function showPins(){
    
    for (i in cityArray) {
      L.marker([cityArray[i].lat, cityArray[i].lng], {
        icon: L.mapquest.icons.marker(),
        draggable: false
      }).bindPopup([cityArray[i].lat, cityArray[i].lng]).addTo(map);
    }
      // console.log(cityArray)
      console.log("hello world")
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

