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

var style = {
  position: 'absolute',
  height: '200px',
  width: '200px',
  'background-color': 'green'
};

angular.module('ngComplete', [])
  .directive('ngComplete', function($http) {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, controller) {
        element.after('<div class\'ng-complete-results\'></div>');

        style.top = (element[0].offsetTop + element[0].offsetHeight) + 'px';
        style.width = element[0].offsetWidth + 'px';

        element.next().css(style);

        scope.$watch(attrs.ngModel, function(value) {
          fetch(attrs.source, function(error, data) {
            if (error) {
              console.error(error);
            } else {

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
            cb(undefined, data);
          }).error(function(data, status, headers, config) {
            cb(status);
          });
        };
      }
    };
  });
