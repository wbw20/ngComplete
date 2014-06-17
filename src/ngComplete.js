'use strict';

/**
 * A directive for adding google places autocomplete to a text box
 * google places autocomplete info: https://developers.google.com/maps/documentation/javascript/places
 *
 * Usage:
 *
 * <input type="text"  ng-autocomplete ng-model="value" source="https://www.example.com/json?q={{value}}"/>
 *
 * + ng-model - autocomplete textbox value
 *
 * + details - more detailed autocomplete result, includes address parts, latlng, etc. (Optional)
 *
 * example:
 *
 *    options = {
 *        types: '(cities)',
 *        country: 'ca'
 *    }
**/

angular.module('ngComplete', [])
  .directive('ngComplete', function($http) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, controller) {
        var results = [],
            selected;

        function show() {
          hide();

          var container = {};
          element.after('<div class=\'ng-complete-container\'></div>');
          container.top = (element[0].offsetTop + element[0].offsetHeight) + 'px';
          container.width = element[0].offsetWidth + 'px';
          element.next().css(container);

          results.forEach(function(result) {
            element.next().append('<div class=\'ng-complete-row\'><h5>' + result.title + '</h5><h5>' + result.subtitle + '</h5></div>');
          });
        };

        function hide() {
          element.next().remove();
        };

        scope.$watch(attrs.ngModel, function(value) {
          if (value === '') { hide(); return; }

          fetch(attrs.source, function(error, data, url) {
            if (error) {
              console.error(error);
            } else {
              results = data;

              if (data.length > 0 && url == attrs.source) {
                show();
              } else {
                hide();
              }
            }
          });
        });

        var fetch = function(url, cb) {
          $http({
            method: 'GET',
            url: url,
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }).success(function(data, status, headers, config) {
            cb(undefined, data, url);
          }).error(function(data, status, headers, config) {
            cb(status);
          });
        };
      }
    };
  });
