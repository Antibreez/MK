'use strict';

(function (
    debounce,
    renderError,
    clearError,
    Form
) {
  var RULE_CLASS = {
    success: 'user-data__validation-item--success',
    error: 'user-data__validation-item--error'
  };

  var input = document.querySelector('.user-data__password-input');
  var rule = document.querySelectorAll('.user-data__validation-item');

  var setSuccessRule = function (num) {
    if (rule[num].classList.contains(RULE_CLASS.error)) {
      rule[num].classList.remove(RULE_CLASS.error)
    }

    if (!rule[num].classList.contains(RULE_CLASS.success)) {
      rule[num].classList.add(RULE_CLASS.success)
    }
  };

  var setErrorRule = function (num) {
    if (rule[num].classList.contains(RULE_CLASS.success)) {
      rule[num].classList.remove(RULE_CLASS.success)
    }

    if (!rule[num].classList.contains(RULE_CLASS.error)) {
      rule[num].classList.add(RULE_CLASS.error)
    }
  };

  var hasUpperCase = function (string) {
    return string.toLowerCase() !== string;
  };

  var hasLowerCase = function (string) {
    return string.toUpperCase() !== string;
  };

  var isLengthValid = false;
  var isNumeralValid = false;
  var isCaseValid = false;

  var validate = function () {
    var string = input.value;

    if (string.length > 5 && string.length < 33) {
      setSuccessRule(0);
      isLengthValid = true;
    } else if (isLengthValid) {
      setErrorRule(0);
    }

    if (/[0-9]/.test(string)) {
      setSuccessRule(1);
      isNumeralValid = true;
    } else if (isNumeralValid) {
      setErrorRule(1);
    }

    if (hasUpperCase(string) && hasLowerCase(string)) {
      setSuccessRule(2);
      isCaseValid = true;
    } else if (isCaseValid) {
      setErrorRule(2);
    }
  };

  var isValid = function () {
    var isValid = true;

    rule.forEach(function (item) {
      if (!item.classList.contains(RULE_CLASS.success)) {
        isValid = false;
      }
    });

    return isValid;
  };

  var Password = function () {
    this._onFocus = this._onFocus.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._onInputDelay = debounce(this._onInputDelay.bind(this));
    this._onInput = this._onInput.bind(this);

    this._form = new Form();
  };

  Password.prototype.addEventListeners = function () {
    input.addEventListener('focus', this._onFocus);
    input.addEventListener('blur', this._onBlur);
  };

  Password.prototype.removeEventListeners = function () {
    input.removeEventListener('focus', this._onFocus);
    input.removeEventListener('blur', this._onBlur);
  };

  Password.prototype.getValue = function () {
    return input.value;
  };

  Password.prototype.clear = function () {
    input.value = '';
    clearError(input);

    rule.forEach(function (item) {
      item.className = 'user-data__validation-item';
    });

    isLengthValid = false;
    isNumeralValid = false;
    isCaseValid = false;
  };

  Password.prototype._onFocus = function () {
    input.addEventListener('input', this._onInputDelay);
    input.addEventListener('input', this._onInput);
  };

  Password.prototype._onBlur = function () {
    input.removeEventListener('input', this._onInputDelay);
    input.removeEventListener('input', this._onInput);
  };

  // Password.prototype._getErrorMessage = function () {
  //   var emailValue = this._email.getValue();
  //   var nameValue = this._name.getValue();

  //   if (input.value === emailValue && emailValue !== '') {
  //     return ERROR_MESSAGE.email;
  //   }

  //   if (input.value === nameValue && nameValue !== '') {
  //     return ERROR_MESSAGE.name;
  //   }

  //   return '';
  // };

  Password.prototype._onInput = function () {
    validate();
    if (isValid()) {
      clearError(input);
      this._form.setPasswordValid();
    } else {
      this._form.setPasswordInvalid();
    }

    this._form.test();
  };

  Password.prototype._onInputDelay = function () {
    if (!isValid()) {
      renderError(input, '');
    }
  };

  window.Password = Password;
})(
    window.EventUtil.debounce,
    window.DomUtil.renderError,
    window.DomUtil.clearError,
    window.Form
);
