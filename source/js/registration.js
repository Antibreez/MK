'use strict';

(function (Popup) {
  var button = document.querySelector('.registration__button');

  var Registration = function () {
    this._onClick = this._onClick.bind(this);
    this._onSuccess = this._onSuccess.bind(this);

    this._popup = new Popup(this._onSuccess);
  };

  Registration.prototype.addEventListeners = function () {
    button.addEventListener('click', this._onClick)
  }

  Registration.prototype._onClick = function () {
    this._popup.open();
  };

  Registration.prototype._onSuccess = function () {
    button.setAttribute('disabled', '');
  };

  window.Registration = Registration;
})(window.Popup);
