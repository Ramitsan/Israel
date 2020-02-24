'use strict';

//Показ и закрытие модальных окон
var pageHeaderCallLink = document.querySelector('.page-header__call'); //ссылка
var modalRequestCall = document.querySelector('.request-call'); //модальное окно
var modalCloseRequestCall = modalRequestCall.querySelector('.modal-close'); //кнопка закрытия
var usernameInput = modalRequestCall.querySelector('#modal-user-name'); //поле ввода имени
var usertelInput = modalRequestCall.querySelector('#modal-user-tel'); //поле ввода номера телефона
var agreement = modalRequestCall.querySelector('#agreement'); // чекбокс в форме
var modalRequestCallForm = modalRequestCall.querySelector('.request-call__form'); //форма внутри мод.окна
// var storageUserName = localStorage.getItem('username'); // имя, которое хранится в localStorage
// var storageUserTel = localStorage.getItem('usertel');  // телефон, который хранится в localStorage
var isStorageSupport = true;
var storageUserName = '';
var storageUserTel = '';
var ESC_KEYCODE = 27

try {
  storageUserName = localStorage.getItem('usernameInput');
  storageUserTel = localStorage.getItem('usertelInput');
} catch (err) {
  isStorageSupport = false;
}

var validateForm = function(elem1, elem2) {
  if (elem1.value === '') {
    elem1.style.borderColor = '#ff0000';
  } else {
    elem1.style.borderColor = 'rgba(72, 72, 72, 0.5)';
  }

  if (elem2.value === '') {
    elem2.style.borderColor = '#ff0000';
  } else {
    elem2.style.borderColor = 'rgba(72, 72, 72, 0.5)';
  }

  if (elem1.value !== '' && elem2.value !== '') {
    modalAccepted.classList.add('modal--show');
    modalRequestCall.classList.remove('modal--show');
  }
}

pageHeaderCallLink.addEventListener('click', function(evt) {
  evt.preventDefault;
  modalRequestCall.classList.add('modal--show');
  usernameInput.focus();
  if (storageUserName) {
    usernameInput.value = storageUserName;
    usertelInput.focus();
  } else {
    usernameInput.focus();
  }
  if (storageUserTel) {
    usertelInput.value = storageUserTel;
    agreement.focus();
  }
});


modalCloseRequestCall.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalRequestCall.classList.remove('modal--show');
  modalRequestCall.classList.remove('modal--error');
});

modalRequestCallForm.addEventListener('submit', function(evt) {
  evt.preventDefault();

  validateForm(usernameInput, usertelInput);

  if (!usernameInput.value || !usertelInput.value) {
    evt.preventDefault();
    modalRequestCall.classList.remove('modal--error');
    modalRequestCall.offsetWidth = modalRequestCall.offsetWidth;
    modalRequestCall.classList.add('modal--error');
  } else {
    if (isStorageSupport) {
      localStorage.setItem('usernameInput', usernameInput.value);
      localStorage.setItem('usertelInput', usertelInput.value);
    }
  }
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (modalRequestCall.classList.contains('modal--show')) {
      evt.preventDefault();
      modalRequestCall.classList.remove('modal--show');
      modalRequestCall.classList.remove('modal--error');
    }
    if (modalAccepted.classList.contains('modal--show')) {
      evt.preventDefault();
      modalAccepted.classList.remove('modal--show');
    }
  }
});

//валидация и отправка формы  в блоке "Хочу поехать"
var wantToGoForm = document.querySelector('.want-to-go__form');
var wanttogoUserPhoneInput = wantToGoForm.querySelector('#user-phone')
var modalAccepted = document.querySelector('.accepted');
var modalCloseAcceptedButton = modalAccepted.querySelector('.modal-close');

var validateWanttogoForm = function() {
  if (wanttogoUserPhoneInput.value === '') {
    wanttogoUserPhoneInput.style.borderColor = '#ff0000';
    modalAccepted.classList.remove('modal--show');
  } else {
    wanttogoUserPhoneInput.style.borderColor = 'rgba(72, 72, 72, 0.5)';
    modalAccepted.classList.add('modal--show');
  }
}

wantToGoForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  validateWanttogoForm();
})

modalCloseAcceptedButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalAccepted.classList.remove('modal--show');
});

// Валидация и отправка формы в блоке Contacts
var contactsForm = document.querySelector('.contacts-form');
var contactsUserNameInput = contactsForm.querySelector('#user-name');
var contactsUserTelInput = contactsForm.querySelector('#user-tel');
var contactsButtonSubmit = contactsForm.querySelector('.contacts__button-submit');

contactsForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  validateForm(contactsUserNameInput, contactsUserTelInput);
})
