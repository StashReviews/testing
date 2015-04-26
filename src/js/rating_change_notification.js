var firebaseUrl = "https://dazzling-inferno-1178.firebaseIO.com/";  //create a new firebase ref at the top of the script
var keyRef = new Firebase(firebaseUrl); //putting the firebase into a variable
var thisUser = keyRef.child(auth.uid); //create a variable which holds the current user's unique username
var rateRef = keyRef.child(thisUser).child("ratings").child(/*THIS RATING'S PARENT DIV CLASS == rateRef*/);
/*<<<<ATTACH CLASS TO KEYREF<<<<*/ //create a ref for the targeted dispensary or strains's rating
var categoryRef =
//using .exist from firebase dataSnapshot doc, check to see if a user's rating already exist for dispensary or strain $(this)(or whatever will match the click with the user's rating of the strain)
  rateRef.on("value", ratingsSnapshot
function() { //on value change, run function
  var ratingsData = ratingsSnapshot.val();
  if((ratingsData).exists()) {
    //if the rating exists, then call the following function ratingReplaceNotification to warn the user of their replacing prior ratings
  }

}
)
;
(function ratingReplaceNotification() {
  if($(".notification").click().val() == "yes") {
    //if the user clicks yes, then follow through with the replacement of the prior rating
    keyRef.child("ratings"/*WHEREEVER CUMULATIVE RATINGS EXIST*/).child("cumulativeRating").transaction(function(cumulativeRating) {
      return cumulativeRating + 1;
    });
    rateRef.child("numRatings").transaction(function(numRatings) {
      return numRatings + Number($('input[name="rating"]:checked').val());
    });
  }
  if($(".notification").click().val() == "no") {
    //if the user clicks no, then do nothing
  }
  else {
    //else, set a new rating to that particular strain or dispensary according to that user
  }
});
