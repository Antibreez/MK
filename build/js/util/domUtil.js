'use strict';

(function () {
  var Colors = {
    ERROR: '#9F2B11',
    DEFAULT: '#DDDDDD'
  };

  var forEach = Array.prototype.forEach;

  var clearInput = function (input) {
    input.value = '';
  };

  window.DomUtil = {
    isHidden: function (element) {
      return element.classList.contains('hidden');
    },

    show: function (element) {
      element.classList.add('show');
    },

    hide: function (element) {
      element.classList.remove('show');
    },

    clear: function () {
      forEach.call(arguments, clearInput);
    },

    renderError: function (input, message) {
      input.style.borderColor = Colors.ERROR;
      var errorField = document.querySelector(
        '.' + input.className.slice(0, -5) + 'message'
      );

      if (message !== '') {
        errorField.textContent = message;
      }
    },

    clearError: function (input) {
      input.style.borderColor = Colors.DEFAULT;
      var errorField = document.querySelector(
        '.' + input.className.slice(0, -5) + 'message'
      );
      errorField.textContent = '';
    }
  };
})();

