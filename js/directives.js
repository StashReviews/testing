angular.module('DeViine.directives', [])

  /** <dv-card item-type='' item-id='' /> */
  .directive('dvCard', ['$firebaseObject', 'dvUrl', 'locationService', function($firebaseObject, dvUrl, locationService) {
    return {
      restrict: 'E',
      templateUrl: function(element, attr) {
        return 'partials/cards/' + attr.itemType + '.html';
      },
      /*scope: {
        itemType: '@',
        itemId: '='
      },*/
      link: function(scope, element, attrs) {
        // @todo Pluralize programmatically.
        scope[attrs.itemType] = $firebaseObject( new Firebase(dvUrl + '/' + ( attrs.itemType === 'dispensary' ? 'dispensaries' : ( attrs.itemType + 's' ) ) + '/' + attrs.itemId) );

        locationService.getDistanceToDispensary(attrs.itemId)
          .then(function(distance) {
            scope.distance = distance;
          });
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

  /** <dv-distance distance='' /> */
  .directive('dvDistance', function(distanceService) {
    return {

      link: function(scope, element, attrs) {

        scope.getUserDistance = ratingsService.getUserDistance;
      }
    };
  })

  /** <dv-menu dispensaryId='' /> */
  .directive('dvMenu', ['$firebaseObject', 'dvUrl', function($firebaseObject, dvUrl) {
    return {
      restrict: 'E',
      templateUrl: 'partials/menu.html',
      link: function(scope, element, attrs) {
        $firebaseObject( new Firebase(dvUrl + '/dispensaries/' + attrs.dispensaryId + '/menu') ).$loaded()
          .then(function(menu) {
            scope.menu = menu;
          });
      }
    }
  }])

  // /** Elevate Zoom (Strains) */
  // .directive('ngElevateZoom', function() {
  //   return {
  //     restrict: 'A',
  //     link: function(scope, element, attrs) {

  //       //Will watch for changes on the attribute
  //       attrs.$observe('zoomImage',function(){
  //         linkElevateZoom();
  //       })

  //       function linkElevateZoom(){
  //         //Check if its not empty
  //         if (!attrs.zoomImage) return;
  //         element.attr('data-zoom-image',attrs.zoomImage);
  //         $(element).elevateZoom({
  //           zoomType:"lens",
  //           lensShape : "round",
  //           lensSize : 250
  //         });
          
  //       }

  //       linkElevateZoom();

  //     }
  //   };
  // })

  /** Custom Strain Zoom */
  .directive('ngStrainZoom', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        //Will watch for changes on the attribute
        attrs.$observe('zoomImage',function(){
          linkStrainZoom();
          console.log('New Strain Image Found');
        })

        function linkStrainZoom() {
          var native_width = 0;
          var native_height = 0;

          //Now the mousemove function
          $("#strainGalleryWrap").mousemove(function(e){
            //When the user hovers on the image, the script will first calculate
            //the native dimensions if they don't exist. Only after the native dimensions
            //are available, the script will show the zoomed version.
            if(!native_width && !native_height)
            {
              //This will create a new image object with the same image as that in #strainGallery
              //We cannot directly get the dimensions from #strainGallery because of the 
              //width specified to 200px in the html. To get the actual dimensions we have
              //created this image object.
              var image_object = new Image();
              image_object.src = $("#strainGallery").attr("src");
              
              //This code is wrapped in the .load function which is important.
              //width and height of the object would return 0 if accessed before 
              //the image gets loaded.
              native_width = image_object.width;
              native_height = image_object.height;
            }
            else
            {
              //x/y coordinates of the mouse
              //This is the position of .magnify with respect to the document.
              var magnify_offset = $(this).offset();
              //We will deduct the positions of .magnify from the mouse positions with
              //respect to the document to get the mouse positions with respect to the 
              //container(.magnify)
              var mx = e.pageX - magnify_offset.left;
              var my = e.pageY - magnify_offset.top;
              
              //Finally the code to fade out the glass if the mouse is outside the container
              if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0)
              {
                $("#zoom").fadeIn(100);
              }
              else
              {
                $("#zoom").fadeOut(100);
              }
              if($("#zoom").is(":visible"))
              {
                //The background position of #zoom will be changed according to the position
                //of the mouse over the #strainGallery image. So we will get the ratio of the pixel
                //under the mouse pointer with respect to the image and use that to position the 
                //large image inside the magnifying glass
                var rx = Math.round(mx/$("#strainGallery").width()*native_width - $("#zoom").width()/2)*-1;
                var ry = Math.round(my/$("#strainGallery").height()*native_height - $("#zoom").height()/2)*-1;
                var bgp = rx + "px " + ry + "px";
                
                //Time to move the magnifying glass with the mouse
                var px = mx - $("#zoom").width()/2;
                var py = my - $("#zoom").height()/2;
                //Now the glass moves with the mouse
                //The logic is to deduct half of the glass's width and height from the 
                //mouse coordinates to place it with its center at the mouse coordinates
                
                //If you hover on the image now, you should see the magnifying glass in action
                $("#zoom").css({left: px, top: py, backgroundPosition: bgp});
              }
            }
          })
        }

      }
    };
  })


  /** Donut Charts */
  .directive('ngDonut', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {

        //Will watch for changes on the attribute
        attrs.$observe('data',function(){
          console.log('Strain profile received from database. Executing drawDonuts();');
          drawDonuts();
        })

        function drawDonuts(){

          drawDonut("#graph1");
          drawDonut("#graph2");
          drawDonut("#graph3");
          /* 
            TODO:
            add an addtional data attr called "data-backup" which will hold the src
            image backup for ie8...or maybe use: https://github.com/mhemesath/r2d3/
          */

          function getAmounts(elem){
            amounts = node.getAttribute("data-amounts").split(",");
          }

          function drawDonut(elem){
            var node = document.querySelector(elem);
            var width = height = $('.flavors').width();
            // var width = height = node.getAttribute("data-size") || 100;
            var thickness = node.getAttribute("data-thickness") || 30;
            var duration = node.getAttribute('data-duration') || 850;
            var delay = node.getAttribute('data-delay') || 0;
            // @todo = amounts needs to load in after data loads.
            var amounts = node.getAttribute("data-amounts").split(",");
            var fills = node.getAttribute("data-fills").split(",");
            
            var radius = Math.min(width, height) / 2;
            var pie = d3.layout.pie().sort(null);
            
            var svg = d3.select(elem).append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
            
            var arc = d3.svg.arc()
                .innerRadius(radius - thickness)
                .outerRadius(radius);
            
            svg.selectAll("path")
              .data(pie(amounts))
              .enter()
              .append("path")
              .style("fill", function(d, i) { return fills[i]; })
              .attr("d", arc)
              .transition()
              .delay(delay)
              .duration(duration)
              .call(arcTween);
            
            function arcTween(transition) {
              transition.attrTween("d", function(d) {
                var interpolate = d3.interpolate(d.startAngle, d.endAngle);
                return function(t) {
                  d.endAngle = interpolate(t);
                  return arc(d);
                };
              });
            }
          }
        }

      }
    };
  })


  // .directive('dvReview', ['$firebaseObject', 'dvUrl', function($firebaseObject, dvUrl) {
  //   return {
  //     restrict: 'E',
  //     templateUrl: function(element, attr) {
  //       return 'partials/review.html';
  //     }
  //     /*
  //       scope: {
  //         itemType: '@',
  //         itemId: '='
  //       },
  //     */
  //   };
  // }])


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
            var itemType = $('.pageTitle').attr('title');
            var userId = $('.username').attr('title');
            var itemId = $('.pageId').attr('title');
            var reviewsRef = new Firebase('https://deviineadmin.firebaseio.com/' + itemType + '/' + itemId + '/reviews');
            var userReviewsRef = new Firebase('https://deviineadmin.firebaseio.com/users/' + userId + '/reviews/' + itemType + '/'+ itemId);
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

            var itemType = $('.pageTitle').attr('title');
            var userId = $('.username').attr('title');
            var itemId = $('.pageId').attr('title');
            var reviewsRef = new Firebase('https://deviineadmin.firebaseio.com/' + itemType + '/' + itemId + '/reviews');
            var userReviewsRef = new Firebase('https://deviineadmin.firebaseio.com/users/' + userId + '/reviews/' + itemType + '/' + itemId);

            
            if (! text) {
              // If nothing was typed into review input, alert.
              alert("Sorry, you can't submit a blank review.");
            } else {
              // If a review was typed, push the avatar, name, date and review to firebase.
              reviewsRef.push({avatar:avatar, name:name, text:text, date:today});
              userReviewsRef.push({avatar:avatar, name:name, text:text, date:today});
              // Reset review input.
              $('#reviewInput').hide();
              $('#submitReview').hide();
              $('.reviewBanner').text("You'll be able to see all of your reviews in a later release.");
              $('.avatarWrap .avatar').css({"margin-left":"0px"});
              $('.reviewBanner').show();

              // Success alert.
              alert("Awesome! Thanks for submitting a review. It may take a bit for your review to show up. Later, you'll be able to access all of your reviews to remember your experiences!");
            }

          });

      }
    };
  })

;
