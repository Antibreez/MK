'use strict';

(function (
  clearError,
  Form
) {
var input = document.querySelector('.user-data__repeat-password-input');

var RepeatPassword = function () {
  this._onFocus = this._onFocus.bind(this);
  this._onBlur = this._onBlur.bind(this);
  this._onInput = this._onInput.bind(this);

  this._form = new Form();
};

RepeatPassword.prototype.addEventListeners = function () {
  input.addEventListener('focus', this._onFocus);
  input.addEventListener('blur', this._onBlur);
};

RepeatPassword.prototype.removeEventListeners = function () {
  input.removeEventListener('focus', this._onFocus);
  input.removeEventListener('blur', this._onBlur);
};

RepeatPassword.prototype.clear = function () {
  input.value = '';
  clearError(input);
};

RepeatPassword.prototype._onFocus = function () {
  input.addEventListener('input', this._onInput);
};

RepeatPassword.prototype._onBlur = function () {
  input.removeEventListener('input', this._onInput);
};

RepeatPassword.prototype._onInput = function () {
  this._form.test();
};

window.RepeatPassword = RepeatPassword;
})(
  window.DomUtil.clearError,
  window.Form
);
