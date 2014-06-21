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

        function _show() {
          _hide();

          element.after('<div class=\'ng-complete-container\'></div>');
          _container().css({
            top: (element[0].offsetTop + element[0].offsetHeight) + 'px',
            width: element[0].offsetWidth + 'px'
          });

          results.forEach(function(result) {
            var row = $('<div class=\'ng-complete-row\'><h5>' + result.title + '</h5><h5>' + result.subtitle + '</h5></div>');
            _container().append(row);

            row.on('mouseenter', function(event) {
              _select($(event.target));
            });
          });

          _container().on('click', function(event) {
            _enter();
          });

          $(element).unbind('keyup').on('keyup', _keyup);
        }

        function _keyup(event) {
          switch (event.keyCode) {
            case 40: // down
              _down(); break;
            case 38: // up
              _up(); break;
            case 27: // esc
              _hide(); break;
            case 13: // enter
              _enter(); break;
          }

          event.preventDefault();
        }

        function _hide() {
          $('.ng-complete-container').remove();
        }

        function _enter() {
          var current = $(element).val(),
              cursor = $(element).getCursorPosition(),
              value = results[_selected().index()].title;

          $(element).val([current.slice(0, cursor), value, current.slice(cursor)].join(''));
          _hide();
        }

        function _selected() {
          return $('.ng-complete-row.selected');
        }

        function _container() {
          return $('.ng-complete-container');
        }

        function _down() {
          var selected = _selected();

          if (selected.length === 0) {
            _select($('.ng-complete-row').first());
          } else if (selected.next()) {
            _select(selected.next());
          }
        }

        function _up() {
          var selected = _selected();

          if (selected.prev()) {
            _select(selected.prev())
          }
        }

        function _select(el) {
          _selected().removeClass('selected');
          el.addClass('selected');
        }

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

/*
 *  http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
 */

(function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
})(jQuery);
