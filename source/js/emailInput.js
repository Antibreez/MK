'use strict';

(function (
    debounce,
    renderError,
    clearError,
    Form
) {
  var ERROR_MESSAGE = 'Пожалуйста, введите правильный email адрес';
  var ERROR_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  var input = document.querySelector(".user-data__email-input");

  var isValid = function (input) {
    return ERROR_PATTERN.test(input);
  };

  var Email = function () {
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onInputDelay = debounce(this._onInputDelay.bind(this));
    this._onInput = this._onInput.bind(this);

    this._form = new Form();
  };

  Email.prototype.addEventListeners = function () {
    input.addEventListener('focus', this._onFocus);
    input.addEventListener('blur', this._onBlur);
  };

  Email.prototype.removeEventListeners = function () {
    input.removeEventListener('focus', this._onFocus);
    input.removeEventListener('blur', this._onBlur);
  };

  Email.prototype.getValue = function () {
    return input.value;
  };

  Email.prototype.clear = function () {
    input.value = '';
    clearError(input);
  };

  Email.prototype._onFocus = function () {
    input.addEventListener('input', this._onInputDelay);
    input.addEventListener('input', this._onInput);
  };

  Email.prototype._onBlur = function () {
    input.removeEventListener('input', this._onInputDelay);
    input.removeEventListener('input', this._onInput);
  };

  Email.prototype._onInput = function () {
    if (isValid(input.value)) {
      clearError(input);
      this._form.setEmailValid();
    } else {
      this._form.setEmailInvalid();
    }

    this._form.test();
  }

  Email.prototype._onInputDelay = function () {
    if (!isValid(input.value)) {
      renderError(input, ERROR_MESSAGE);
    }
  }

  window.Email = Email;
})(
    window.EventUtil.debounce,
    window.DomUtil.renderError,
    window.DomUtil.clearError,
    window.Form
);
