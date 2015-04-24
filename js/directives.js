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
        ratings: '='
      },
      link: function(scope, element, attrs) {
        scope.getAvgRating = ratingsService.getAvgRating;

        scope.getRatingsCount = ratingsService.getRatingsCount;
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

  /** Disqus Reviews */
  .directive('dirDisqus', function($window) {
      return {
          restrict: 'E',
          scope: {
              disqus_shortname: '@disqusShortname',
              disqus_identifier: '@disqusIdentifier',
              disqus_title: '@disqusTitle',
              disqus_url: '@disqusUrl',
              disqus_category_id: '@disqusCategoryId',
              disqus_disable_mobile: '@disqusDisableMobile',
              readyToBind: "@"
          },
          template: '<div id="disqus_thread"></div>',
          link: function(scope) {

              scope.$watch("readyToBind", function(isReady) {

                  // If the directive has been called without the 'ready-to-bind' attribute, we
                  // set the default to "true" so that Disqus will be loaded straight away.
                  if ( !angular.isDefined( isReady ) ) {
                      isReady = "true";
                  }
                  if (scope.$eval(isReady)) {
                      // put the config variables into separate global vars so that the Disqus script can see them
                      $window.disqus_shortname = scope.disqus_shortname;
                      $window.disqus_identifier = scope.disqus_identifier;
                      $window.disqus_title = scope.disqus_title;
                      $window.disqus_url = scope.disqus_url;
                      $window.disqus_category_id = scope.disqus_category_id;
                      $window.disqus_disable_mobile = scope.disqus_disable_mobile;

                      // get the remote Disqus script and insert it into the DOM
                      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                      dsq.src = '//' + scope.disqus_shortname + '.disqus.com/embed.js';
                      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                  }
              });
          }
      };
  })
;
