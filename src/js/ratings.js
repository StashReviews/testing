$(document).ready(function() {
  var firebaseUrl = "https://dazzling-inferno-1178.firebaseIO.com/"; //create a new firebase ref at the top of the script
  var keyRef = new Firebase(firebaseUrl); //putting the firebase into a variable
  var star = $("input[type='radio'][name='rating']");
  var itemId = $("#rating1").attr('class');
  var numRatings;
  var cumulativeRating;
  var thisUser = keyRef.child(auth.uid); //create a variable which holds the current user's unique username
  var rateRef = keyRef.child("strains").child(itemId).child("ratings").child(thisUser); //create a ref for the targeted dispensary or strains's rating


  star.click(function() {
    //using .exist from firebase dataSnapshot doc, check to see if a user's rating already exist for dispensary or strain $(this)(or whatever will match the click with the user's rating of the strain)

    if((thisUser).exists() === false) {
      signUpModal.fadeIn();
    }
    /***********************************/
    var ratingsData = rateRef.val(); //******DOES THIS LINE MAKE SENSE?????*******
    /**********************************/
    if((ratingsData).exists()) {
      modal.fadeIn();
      ratingReplaceNotification();//if the rating exists, then call the following function ratingReplaceNotification to warn the user of their replacing prior ratings
    }
    else {
      //else, set a new rating to that particular strain or dispensary according to that user
      keyRef.child("strains").child(itemId).child("numRatings").transaction(function(numRatings) {
        return numRatings + 1;
      });
      rateRef.child("cumulativeRating").set(function(cumulativeRating) {
        return cumulativeRating + Number($('input[name="rating"]:checked').val());
      });
    }
  });
  (function ratingReplaceNotification() {
    if($(".notification").click().val() == "yes") {
      //if the user clicks yes, then follow through with the replacement of the prior rating
      keyRef.child("strains").child(itemId).child("numRatings").transaction(function(numRatings) {
        return numRatings + 1;
      });
      //close modal
      modal.fadeOut();
      rateRef.child("numRatings").set(function(numRatings) {
        return cumulativeRating + Number($('input[name="rating"]:checked').val());
      });
    }
    else if($(".no").click()) {
      //if the user clicks no, then do nothing
      //close modal
      var modal = $('.modal');
      modal.fadeOut();
    }
  });
  var averageRating;
  rateRef.child("ratings").on("value", function(ratingsSnapshot) {
    var ratingsData = ratingsSnapshot.val();
    if(ratingsData) {
      cumulativeRating = ratingsData.cumulativeRating;
      numRatings = ratingsData.numRatings;
      averageRating = cumulativeRating / numRatings;
      //itemId is not bringing in the correct itemId for output
      $('#' + itemId + 'Users').html("/5 BY " + numRatings + " USERS");
      $('#' + itemId + 'Ratings').html("RATED " + averageRating.toFixed());
      /**********************************/
      //RATINGS SYSTEM NEEDS TO BE ADJUSTED TO OUTPUT TO WHICHEVER STRAIN / DISPENSARY THAT RATED IT
      //CURRENTLY IS ONLY OUTPUTTING THE RATING TO THE PAGE'S RATING (AK47.PHP)
      /**********************************/
    }

  });
});