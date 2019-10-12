'use strict';

(function () {
  var DEBOUNCE_DELAY = 1000;

  window.EventUtil = {
    isEscapeKey: function (evt) {
      return evt.key === 'Esc' || evt.key === 'Escape';
    },

    isEnterKey: function (evt) {
      return evt.key === 'Enter';
    },

    isLeftKey: function (evt) {
      return evt.key === 'ArrowLeft' || evt.key === 'Left';
    },

    isRightKey: function (evt) {
      return evt.key === 'ArrowRight' || evt.key === 'Right';
    },

    isNotTarget: function (evt, element) {
      return evt.target !== element;
    },

    debounce: function (onDelay, delay) {
      var timeoutId = 0;
      return function () {
        var params = arguments;

        if (timeoutId > 0) {
          clearTimeout(timeoutId);
        }

        var onTimeout = function () {
          onDelay.apply(null, params);
        };

        timeoutId = setTimeout(onTimeout, delay || DEBOUNCE_DELAY);
      };
    }
  };
})();
