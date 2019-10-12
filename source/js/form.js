'use strict';

(function (
    renderError,
    clearError
) {
  var ERROR_MESSAGE = {
    email: 'Пароль не должен совпадать с почтовым адресом',
    name: 'Пароль не должен совпадать с никнеймом',
    passwords: 'Пароли не совпадают'
  };

  var form = document.querySelector('form');
  var submitButton = document.querySelector('.user-data__button');
  var checkbox = document.querySelector('.user-data__agreement-input');

  var emailInput = document.querySelector('.user-data__email-input');
  var nameInput = document.querySelector('.user-data__name-input');
  var passwordInput = document.querySelector('.user-data__password-input');
  var repeatPasswordInput = document.querySelector('.user-data__repeat-password-input');

  var isEmailValid = false;
  var isNameValid = false;
  var isPasswordValid = false;
  var isAgree = false;

  var Form = function (onSend) {
    this.test = this.test.bind(this);
    this._onSend = onSend;
    this._onChange = this._onChange.bind(this);
    this._onEmailCheck = this._onEmailCheck.bind(this);
    this._onNameCheck = this._onNameCheck.bind(this);
    this._onPasswordsCheck = this._onPasswordsCheck.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  };

  Form.prototype.setEmailValid = function () {
    isEmailValid = true;
  };

  Form.prototype.setEmailInvalid = function () {
    isEmailValid = false;

  };

  Form.prototype.setNameValid = function () {
    isNameValid = true;
  };

  Form.prototype.setNameInvalid = function () {
    isNameValid = false;
  };

  Form.prototype.setPasswordValid = function () {
    isPasswordValid = true;
  };

  Form.prototype.setPasswordInvalid = function () {
    isPasswordValid = false;
  };

  Form.prototype.addEventListeners = function () {
    checkbox.addEventListener('change', this._onChange);
    form.addEventListener('submit', this._onSubmit);
  };

  Form.prototype.removeEventListeners = function () {
    checkbox.removeEventListener('change', this._onChange);
    form.removeEventListener('submit', this._onSubmit);
  };

  Form.prototype.test = function () {
    if (
        isEmailValid
        && isNameValid
        && isPasswordValid
        && isAgree
        && this._isEmailDifferPassword()
        && this._isNameDifferPassword()
        && this._isPasswordsEqual()
    ) {
      if (submitButton.hasAttribute('disabled')) {
        submitButton.removeAttribute('disabled');
      }
    } else {
      if (!submitButton.hasAttribute('disabled')) {
        submitButton.setAttribute('disabled', '');
      }
    }

    this._onEmailCheck();
    this._onNameCheck();
    if (this._isEmailDifferPassword() && this._isNameDifferPassword()) {
      clearError(passwordInput);
    }

    this._onPasswordsCheck();
  };

  Form.prototype.clear = function () {
    if (!submitButton.hasAttribute('disabled')) {
      submitButton.setAttribute('disabled', '');
    }

    if (checkbox.checked) {
      checkbox.checked = !checkbox.checked;
      isAgree = false;
    }
  };

  Form.prototype._isEmailDifferPassword = function () {
    return emailInput.value !== passwordInput.value;
  };

  Form.prototype._isNameDifferPassword = function () {
    return nameInput.value !== passwordInput.value;
  };

  Form.prototype._isPasswordsEqual = function () {
    return passwordInput.value === repeatPasswordInput.value;
  };

  Form.prototype._onEmailCheck = function () {
    if (
        !this._isEmailDifferPassword()
        && emailInput.value !== ''
        && passwordInput.value !== ''
    ) {
      renderError(passwordInput, ERROR_MESSAGE.email);
    }
  };

  Form.prototype._onNameCheck = function () {
    if (
      !this._isNameDifferPassword()
      && nameInput.value !== ''
      && passwordInput.value !== ''
    ) {
      renderError(passwordInput, ERROR_MESSAGE.name);
    }
  };

  Form.prototype._onPasswordsCheck = function () {
    this._isPasswordsEqual()
      ? clearError(repeatPasswordInput)
      : renderError(repeatPasswordInput, ERROR_MESSAGE.passwords);
  };

  Form.prototype._onChange = function () {
    isAgree ? isAgree = false : isAgree = true;

    this.test();
  };

  Form.prototype._onSubmit = function (evt) {
    evt.preventDefault();

    var object = {};
    var formData = new FormData(form);

    formData.forEach(function (value, key) {
      object[key] = value;
    });

    var json = JSON.stringify(object);
    console.log(json);

    this._onSend();
  };

  window.Form = Form;
})(
    window.DomUtil.renderError,
    window.DomUtil.clearError,
);
