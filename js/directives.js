angular.module('DeViine.directives', [])

  /** <dv-card item-type='' item-id='' /> */
  .directive('dvCard', ['$firebase', 'dvUrl', function($firebase, dvUrl) {
    return {
      restrict: 'E',
      templateUrl: function(element, attr) {
        return 'partials/cards/' + attr.itemType + '.html';
      },
      /*
        scope: {
          itemType: '@',
          itemId: '='
        },
      */
      link: function(scope, element, attrs) {
        // @todo Pluralize programmatically.
        scope[attrs.itemType] = $firebase( new Firebase(dvUrl + '/' + ( attrs.itemType === 'dispensary' ? 'dispensaries' : ( attrs.itemType + 's' ) ) + '/' + attrs.itemId) ).$asObject();
      }
    };
  }])

  // @todo Consider whether or not this should be a directive.
  /** <dv-search-bar item-type='' /> */
  .directive('dvSearchBar', function() {
    return {
      restrict: 'E',
      templateUrl: function(element, attr) {
        return 'partials/search/' + attr.itemType + '.html';
      },
      scope: {
        itemType: '@'
      }
    }
  })

  /** <dv-card-list item-type='' items='' /> */
  // @todo Fix the dvCardList directive.
  .directive('dvCardList', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/cards/cardList.html',
      scope: {
        itemType: '@',
        items: '='
      }
    };
  })

  /** <dv-rating ratings='' /> */
  .directive('dvRating', function(ratingsService) {
    return {
      restrict: 'E',
      templateUrl: 'partials/rating.html',
      scope: {
        ratings: '=',
        strainDetails: '=',
        currentUser: '='
      },
      link: function(scope, element, attrs) {
        scope.getAvgRating = ratingsService.getAvgRating;

        scope.getRatingsCount = ratingsService.getRatingsCount;

        scope.getUserRating = ratingsService.getUserRating;
      }
    };
  })

  /** <dv-menu dispensaryId='' /> */
  .directive('dvMenu', ['$firebase', 'dvUrl', function($firebase, dvUrl) {
    return {
      restrict: 'E',
      templateUrl: 'partials/menu.html',
      link: function(scope, element, attrs) {
        $firebase( new Firebase(dvUrl + '/dispensaries/' + attrs.dispensaryId + '/menu') ).$asObject().$loaded()
          .then(function(menu) {
            scope.menu = menu;
          });
      }
    }
  }])

  /** Elevate Zoom (Strains) */
  .directive('ngElevateZoom', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        //Will watch for changes on the attribute
        attrs.$observe('zoomImage',function(){
          linkElevateZoom();
        })

        function linkElevateZoom(){
          //Check if its not empty
          if (!attrs.zoomImage) return;
          element.attr('data-zoom-image',attrs.zoomImage);
          $(element).elevateZoom({
            zoomType:"lens",
            lensShape : "round",
            lensSize : 250
          });
          
        }

        linkElevateZoom();

      }
    };
  })

   /** Reviews Refresh */
  .directive('ngReviews', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        //Will watch for changes on the attribute
        attrs.$observe('data',function(){
          linkRefreshReviews();
        })

        function linkRefreshReviews(){
          // Hide Please Sign In to Submit Review
          var name = $('.username').attr('title');
          if (! name) {
            $(".pleaseSignIn").show();
          } else {
            $(".pleaseSignIn").hide();
          }

          if (!attrs.data) return;
            // Show Reviews
            var userId = $('.username').attr('title');
            var itemId = $('.strainId').attr('title');
            var reviewsRef = new Firebase('https://deviineadmin.firebaseio.com/strains/' + itemId + '/reviews');
            var userReviewsRef = new Firebase('https://deviineadmin.firebaseio.com/users/' + userId + '/reviews/' + itemId);
            // Add a callback that is triggered for each chat review.
            reviewsRef.on('child_added', function (snapshot) {
              var review = snapshot.val();
              $('<img class=".reviewAvatar"/>').attr("src", review.avatar).appendTo($('#reviewsDiv'));
              $('<h4 class=".reviewAuthor"/>').text(review.name).appendTo($('#reviewsDiv'));
              $('<h6 class=".reviewDate"/>').text(review.date).appendTo($('#reviewsDiv'));
              $('<p class=".reviewText"/>').text(review.text).appendTo($('#reviewsDiv'));
              // $('.reviewAuthor').text(review.name).appendTo($('#reviewsDiv'));
              // $('.reviewText').text(review.text).appendTo($('#reviewsDiv'));
              // $(".reviewAvatar").attr("src", review.avatar);
              $('#reviewsDiv')[0].scrollTop = $('#reviewsDiv')[0].scrollHeight;

            });
        }

        linkRefreshReviews();


          // Review Banner Animations
          $('.closeReviewBanner').on( "click", function() {
            $('.reviewBanner').hide();
            $('.avatarWrap .avatar').css({"margin-left":"-20px"});
            $('#reviewInput').css({"padding-top":"10px","padding-left":"25px"});
          });
          $('.avatarWrap .avatar').on( "click", function() {
            $('.reviewBanner').show();
            $('.avatarWrap .avatar').css({"margin-left":"0px"});
            $('#reviewInput').css({"padding-top":"40px","padding-left":"10px"});
          });


          // When the user clicks on submit review input, write the review to firebase.
          $('#submitReview').on( "click", function() {

            var avatar = $('.avatar').attr('src');
            var name = $('.name').attr('title');
            var text = $('#reviewInput').val();

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth();

            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            var month = monthNames[mm];

            var yyyy = today.getFullYear();
            var today = month+' '+dd+', '+yyyy;

            var userId = $('.username').attr('title');
            var itemId = $('.strainId').attr('title');
            var reviewsRef = new Firebase('https://deviineadmin.firebaseio.com/strains/' + itemId + '/reviews');
            var userReviewsRef = new Firebase('https://deviineadmin.firebaseio.com/users/' + userId + '/reviews/' + itemId);

            
            if (! text) {
              // If nothing was typed into review input, alert.
              alert("Sorry, you can't submit a blank review.");
            } else {
              // If a review was typed, push the avatar, name, date and review to firebase.
              reviewsRef.push({avatar:avatar, name:name, text:text, date:today});
              userReviewsRef.push({avatar:avatar, name:name, text:text, date:today});
              // Reset review input.
              $('#reviewInput').hide();
              $('#submitReview').attr('value', "Your review was successful!").css("background","none");
              $('.reviewBanner').text("You'll be able to see all of your reviews in a later release.");
              $('.avatarWrap .avatar').css({"margin-left":"0px"});
              $('.reviewBanner').show();

              // Success alert.
              alert("Awesome! Thanks for submitting a review. It may take a bit for your review to show up. Later, you'll be able to access all of your reviews to remember your highs!");
            }

          });

      }
    };
  })

;
