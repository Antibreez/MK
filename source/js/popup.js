'use strict';

(function (
    EventUtil,
    DomUtil,
    Email,
    Name,
    Password,
    RepeatPassword,
    Form
) {
  var popup = document.querySelector('.user-data');
  var closeButton = popup.querySelector('.user-data__close');

  var Popup = function (onSuccess) {
    this._close = this._close.bind(this);
    this._onSuccess = onSuccess;
    this._onSend = this._onSend.bind(this);
    this._onEscapePress = this._onEscapePress.bind(this);

    this._email = new Email();
    this._name = new Name();
    this._password = new Password();
    this._repeatPassword = new RepeatPassword();
    this._form = new Form(this._onSend);
  };

  Popup.prototype.open = function () {
    DomUtil.show(popup);
    this._addEventListeners();
  };

  Popup.prototype._onSend = function () {
    this._onSuccess();
    this._close();
  };

  Popup.prototype._close = function () {
    DomUtil.hide(popup);
    this._removeEventListeners();
    this._email.clear();
    this._name.clear();
    this._password.clear();
    this._repeatPassword.clear();
    this._form.clear();
  };

  Popup.prototype._addEventListeners = function () {
    document.addEventListener('keydown', this._onEscapePress);
    closeButton.addEventListener('click', this._close);
    this._email.addEventListeners();
    this._name.addEventListeners();
    this._password.addEventListeners();
    this._repeatPassword.addEventListeners();
    this._form.addEventListeners();
  };

  Popup.prototype._removeEventListeners = function () {
    document.removeEventListener('keydown', this._onEscapePress);
    closeButton.removeEventListener('click', this._close);
    this._email.removeEventListeners();
    this._name.removeEventListeners();
    this._password.removeEventListeners();
    this._repeatPassword.removeEventListeners();
    this._form.removeEventListeners();
  };

  Popup.prototype._onEscapePress = function (evt) {
    return EventUtil.isEscapeKey(evt) && this._close();
  };

  window.Popup = Popup;
})(
    window.EventUtil,
    window.DomUtil,
    window.Email,
    window.Name,
    window.Password,
    window.RepeatPassword,
    window.Form
);
