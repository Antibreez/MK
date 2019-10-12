'use strict';

(function (
    debounce,
    renderError,
    clearError,
    Form
) {
  var ERROR_MESSAGE = {
    toShort: 'Длина никнейма должна быть не менее 3 символов',
    toLong: 'Длина никнейма должна быть не более 40 символов',
    symbol: "Допускаются только латинские буквы, цифры, символы '_' и ';'",
    firstSymbol: "Никнейм может начинаться только с латинской буквы",
    notSingleWord: "Никнейм должен состоять из одного слова"
  };

  var PATTERN = {
    symbol: /^[A-Za-z0-9_;]*$/,
    firstSymbol: /^[A-Za-z]/
  };

  var input = document.querySelector('.user-data__name-input');

  var emptyStringFilter = function (string) {
    return string.length > 0;
  };

  var getWords = function (string) {
    return string.split(' ').filter(emptyStringFilter);
  };

  var getErrorMessage = function () {
    var string = input.value;

    if (getWords(string).length > 1) {
      return ERROR_MESSAGE.notSingleWord;
    };

    if (string.length < 3) {
      return ERROR_MESSAGE.toShort;
    }

    if (string.length > 40) {
      return ERROR_MESSAGE.toLong;
    }

    if (!PATTERN.firstSymbol.test(string)) {
      return ERROR_MESSAGE.firstSymbol;
    }

    if (!PATTERN.symbol.test(string)) {
      return ERROR_MESSAGE.symbol;
    }

    return '';
  };

  var Name = function () {
    this._currentError = '';
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onInputDelay = debounce(this._onInputDelay.bind(this));
    this._onInput = this._onInput.bind(this);

    this._form = new Form();
  };

  Name.prototype.addEventListeners = function () {
    input.addEventListener('focus', this._onFocus);
    input.addEventListener('blur', this._onBlur);
  };

  Name.prototype.removeEventListeners = function () {
    input.removeEventListener('focus', this._onFocus);
    input.removeEventListener('blur', this._onBlur);
  };

  Name.prototype.getValue = function () {
    return input.value;
  };

  Name.prototype.clear = function () {
    input.value = '';
    clearError(input);
  };

  Name.prototype._onFocus = function () {
    input.addEventListener('input', this._onInputDelay);
    input.addEventListener('input', this._onInput);
  };

  Name.prototype._onBlur = function () {
    input.removeEventListener('input', this._onInputDelay);
    input.removeEventListener('input', this._onInput);
  };

  Name.prototype._onInput = function () {
    var message = getErrorMessage();

    if (message === '') {
      clearError(input);
      this._form.setNameValid();
    } else {
      this._form.setNameInvalid();
    }

    this._form.test();
  };

  Name.prototype._onInputDelay = function () {
    var message = getErrorMessage();

    if (message !== '') {
      renderError(input, message);
    }
  };

  window.Name = Name;
})(
    window.EventUtil.debounce,
    window.DomUtil.renderError,
    window.DomUtil.clearError,
    window.Form
);
