(function() {
  var firebaseUrl = "https://dazzling-inferno-1178.firebaseIO.com/GeoLocation";  // Generate a Firebase location
  var firebaseRef = new Firebase(firebaseUrl);

  // Set the URL of the link element to be the Firebase URL *********NOT NECCESARY FOR ANYTHING BUT TESTING*********
  $("#firebaseRef").setAttribute("href", firebaseUrl);

  // Create a new GeoFire instance at the random Firebase location
  var geoFire = new GeoFire(firebaseRef);

//each card will have its own access to a 'distance function'
//the distance function will look for all dv-card instances and grab their itemId and store it inside of a variable called thisCard. 
//the distance function will then grab the location of thisCard and store it in a variable called thisLocation
//the distance function will get the user's location and compare it to thisLocation and store the number in thisDistance

  /* Uses the HTML5 geolocation API to get the current user's location */
  var getLocation = function() {
    if(typeof navigator !== "undefined" && typeof navigator.geolocation !== "undefined") {
      log("Asking user to get their location");
      navigator.geolocation.getCurrentPosition(geolocationCallback, errorHandler);
    } else {
      log("Your browser does not support the HTML5 Geolocation API, so this demo will not work.")
    }
  };

  /* Callback method from the geolocation API which receives the current user's location */
  var geolocationCallback = function(location) {
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;

    var geoQuery = geoFire.query({
      center: [latitude, longitude],
      radius: 9000 //kilometers
    });
    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distanceInKm) {
      var distanceInMiles = distanceInKm * 0.621;

// Get the current user's location
getLocation();

//finally, distance function will spit out thisDistance into the div id="distance" of thisCard
// Append the number of miles to the html
      $("<div />").addClass("added").text(distanceInMiles.toFixed()).appendTo("#" + key);
    });

    log("Retrieved user's location: [" + latitude + ", " + longitude + "]");

    var username = "user";
    geoFire.set(username, [latitude, longitude]).then(function() {
      log("Current user " + username + "'s location has been added to GeoFire");

      // When the user disconnects from Firebase (e.g. closes the app, exits the browser),
      // remove their GeoFire entry
      firebaseRef.child(username).onDisconnect().remove();

      log("Added handler to remove user " + username + " from GeoFire when you leave this page.");
      log("You can use the link above to verify that " + username + " was removed from GeoFire after you close this page.");
    }).catch(function(error) {
      log("Error adding user " + username + "'s location to GeoFire");
    });
  }