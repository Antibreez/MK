'use strict';

(function (
    renderError,
    clearError,
    makeRadioMouseDown
) {
  var ERROR_MESSAGE = {
    email: 'Пароль не должен совпадать с почтовым адресом',
    name: 'Пароль не должен совпадать с никнеймом',
    passwords: 'Пароли не совпадают'
  };

  var form = document.querySelector('form');
  var nextButton = document.querySelector('.user-data__next')
  var checkbox = document.querySelector('.user-data__agreement-input');
  var required = document.querySelector('.user-data__required');
  var additional = document.querySelector('.user-data__additional');

  var radioButtons = additional.querySelectorAll("input[type='radio']");
  var checkboxes = additional.querySelectorAll("input[type='checkbox']");
  var textarea = additional.querySelector('textarea');
  var emailInput = document.querySelector('.user-data__email-input');
  var nameInput = document.querySelector('.user-data__name-input');
  var passwordInput = document.querySelector('.user-data__password-input');
  var repeatPasswordInput = document.querySelector('.user-data__repeat-password-input');

  var isEmailValid = false;
  var isNameValid = false;
  var isPasswordValid = false;
  var isAgree = false;
  var isRadioChecked = false;

  var Form = function (onSend) {
    this.test = this.test.bind(this);
    this._onSend = onSend;
    this._onChange = this._onChange.bind(this);
    this._onEmailCheck = this._onEmailCheck.bind(this);
    this._onNameCheck = this._onNameCheck.bind(this);
    this._onPasswordsCheck = this._onPasswordsCheck.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onNextClick = this._onNextClick.bind(this);
    this._onRadioMouseDown = makeRadioMouseDown();
    this._addRadioEventListeners = this._addRadioEventListeners.bind(this);
    this._removeRadioEventListeners = this._removeRadioEventListeners.bind(this);
    this._onRadioPreventDefault = this._onRadioPreventDefault.bind(this);
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
    nextButton.addEventListener('click', this._onNextClick);

    radioButtons.forEach(this._addRadioEventListeners);
  };

  Form.prototype.removeEventListeners = function () {
    checkbox.removeEventListener('change', this._onChange);
    form.removeEventListener('submit', this._onSubmit);
    nextButton.removeEventListener('click', this._onNextClick);

    radioButtons.forEach(this._removeRadioEventListeners);
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
      if (nextButton.hasAttribute('disabled')) {
        nextButton.removeAttribute('disabled');
      }
    } else {
      if (!nextButton.hasAttribute('disabled')) {
        nextButton.setAttribute('disabled', '');
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
    if (!nextButton.hasAttribute('disabled')) {
      nextButton.setAttribute('disabled', '');
    }

    if (checkbox.checked) {
      checkbox.checked = !checkbox.checked;
      isAgree = false;
    }

    radioButtons.forEach(function (radio) {
      radio.checked = false;
    });

    checkboxes.forEach(function (checkbox) {
      checkbox.checked = false;
    });

    textarea.value = '';

    if (required.classList.contains('visually-hidden')) {
      required.classList.remove('visually-hidden');
    }

    if (!additional.classList.contains('visually-hidden')) {
      additional.classList.add('visually-hidden');
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

  Form.prototype._onNextClick = function () {
    required.classList.add('visually-hidden');
    additional.classList.remove('visually-hidden');
  };

  Form.prototype._onRadioPreventDefault = function (evt) {
    evt.preventDefault();
  };

  Form.prototype._addRadioEventListeners = function (radio) {
    radio.parentNode.addEventListener('mousedown', this._onRadioMouseDown);
    radio.addEventListener('click', this._onRadioPreventDefault);
  };

  Form.prototype._removeRadioEventListeners = function (radio) {
    radio.parentNode.removeEventListener('mousedown', this._onRadioMouseDown);
    radio.removeEventListener('click', this._onRadioPreventDefault);
  };

  window.Form = Form;
})(
    window.DomUtil.renderError,
    window.DomUtil.clearError,
    window.EventUtil.make.makeRadioMouseDown
);
