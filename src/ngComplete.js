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
        var results = [];

        function _show() {
          debugger
          _hide();

          element.after('<div class=\'ng-complete-container\'></div>');
          _container().css({
            top: (element[0].offsetTop + element[0].offsetHeight) + 'px',
            width: element[0].offsetWidth + 'px'
          });

          results.forEach(function(result) {
            _container().append('<div class=\'ng-complete-row selected\'><h5>' + result.title + '</h5><h5>' + result.subtitle + '</h5></div>');
          });

          _container().on('hover', function() {
            alert();
          });
        };

        function _hide() {
          $('.ng-complete-container').remove();
        }

        function _selected() {
          return $('.ng-complete-row.selected');
        }

        function _container() {
          return $('.ng-complete-container');
        }

        function _down() {
          var selected = _selected();

          if (selected.next()) {
            _select(selected.next())
          }
        }

        function _up() {
          var selected = _selected();

          if (selected.previous()) {
            _select(selected.previous())
          }
        }

        function _select(el) {
          _selected.removeClass('selected');
          el.addClass('selected');
        }

        scope.$watch(attrs.ngModel, function(value) {
          if (value === '') { _hide(); return; }

          _fetch(attrs.source, function(error, data, url) {
            if (error) {
              console.error(error);
            } else {
              results = data;

              if (data.length > 0 && url == attrs.source) {
                _show();
              } else {
                _hide();
              }
            }
          });
        });

        var _fetch = function(url, cb) {
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
