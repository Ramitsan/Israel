'use strict';

//Показ и закрытие модальных окон
var pageHeaderCallLink = document.querySelector('.page-header__call'); //ссылка
var modalRequestCall = document.querySelector('.request-call'); //модальное окно Заказать звонок
var modalCloseRequestCallButton = modalRequestCall.querySelector('.modal-close'); //кнопка закрытия
var modalAccepted = document.querySelector('.accepted'); //модальное окно Заявка принята
var acceptedUnderstandButton = modalAccepted.querySelector('.accepted-understand'); //кнопка "Понятно" в окне "Заявка принята"
var modalCloseAcceptedButton = modalAccepted.querySelector('.modal-close'); //кнопка закрытия в окне Заявка принята
var modalOverlay = document.querySelector('.modal-overlay');
var usernameInput = modalRequestCall.querySelector('#modal-user-name'); //поле ввода имени
var usertelInput = modalRequestCall.querySelector('#modal-user-tel'); //поле ввода номера телефона
var agreement = modalRequestCall.querySelector('#agreement'); // чекбокс в форме
var modalRequestCallForm = modalRequestCall.querySelector('.request-call__form'); //форма внутри мод.окна
var isStorageSupport = true;
var storageUserName = '';
var storageUserTel = '';
var ESC_KEYCODE = 27;

try {
  storageUserName = localStorage.getItem('usernameInput');
  storageUserTel = localStorage.getItem('usertelInput');
} catch (err) {
  isStorageSupport = false;
}

var modalRequestCallShow = function() {
  modalRequestCall.classList.add('modal--show');
}

var modalRequestCallClose = function() {
  modalRequestCall.classList.remove('modal--show');
}

var modalAcceptedShow = function() {
  modalAccepted.classList.add('modal--show');
}

var modalAcceptedClose = function() {
  modalAccepted.classList.remove('modal--show');
}

var overlayShowHandler = function() {
  modalOverlay.classList.add('modal--show');
}

var overlayRemoveHandler = function() {
  modalOverlay.classList.remove('modal--show');
}

var disableScrollHandler = function() {
  document.body.classList.add('body-scroll');
}

var activateScrollHandler = function() {
  document.body.classList.remove('body-scroll');
}

var overlayClickHandler = function(popup) {
  modalOverlay.addEventListener('click', function() {
    popup.classList.remove('modal--show');
    overlayRemoveHandler();
    activateScrollHandler();
  })
}

overlayClickHandler(modalRequestCall);
overlayClickHandler(modalAccepted);

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
    modalAcceptedShow();
    overlayShowHandler();
    disableScrollHandler();
    modalRequestCallClose();
  }
}

pageHeaderCallLink.addEventListener('click', function(evt) {
  evt.preventDefault;
  modalRequestCallShow();
  overlayShowHandler();
  disableScrollHandler();
  usernameInput.focus();
  if (storageUserName) {
    usernameInput.value = storageUserName;
    usernameInput.style.borderColor = 'rgba(72, 72, 72, 0.5)';
    usertelInput.focus();
  } else {
    usernameInput.focus();
  }
  if (storageUserTel) {
    usertelInput.value = storageUserTel;
    usertelInput.style.borderColor = 'rgba(72, 72, 72, 0.5)';
    agreement.focus();
  }
});

modalCloseRequestCallButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalRequestCallClose();
  overlayRemoveHandler();
  activateScrollHandler();
});

modalRequestCallForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  validateForm(usernameInput, usertelInput);

  if (isStorageSupport) {
    localStorage.setItem('usernameInput', usernameInput.value);
    localStorage.setItem('usertelInput', usertelInput.value);
  }
});

acceptedUnderstandButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalAcceptedClose();
  overlayRemoveHandler();
  activateScrollHandler();
});

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (modalRequestCall.classList.contains('modal--show')) {
      evt.preventDefault();
      modalRequestCallClose();
      overlayRemoveHandler();
      activateScrollHandler();
    }
    if (modalAccepted.classList.contains('modal--show')) {
      evt.preventDefault();
      modalAcceptedClose();
      overlayRemoveHandler();
      activateScrollHandler();
    }
  }
});

//валидация и отправка формы  в блоке "Хочу поехать"
var wantToGoForm = document.querySelector('.want-to-go__form');
var wanttogoUserPhoneInput = wantToGoForm.querySelector('#user-phone')

var validateWanttogoForm = function() {
  if (wanttogoUserPhoneInput.value === '') {
    wanttogoUserPhoneInput.style.borderColor = '#ff0000';
    modalAcceptedClose();
    overlayRemoveHandler();
    activateScrollHandler();
  } else {
    wanttogoUserPhoneInput.style.borderColor = 'rgba(72, 72, 72, 0.5)';
    modalAcceptedShow();
    overlayShowHandler();
    disableScrollHandler();
  }
}

wantToGoForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  validateWanttogoForm();
})

modalCloseAcceptedButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalAcceptedClose();
  overlayRemoveHandler();
  activateScrollHandler();
});

// Валидация и отправка формы в блоке Contacts
var contactsForm = document.querySelector('.contacts-form');
var contactsUserNameInput = contactsForm.querySelector('#user-name');
var contactsUserTelInput = contactsForm.querySelector('#user-tel');
var contactsButtonSubmit = contactsForm.querySelector('.contacts__button-submit');

//отправка формы
contactsForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  validateForm(contactsUserNameInput, contactsUserTelInput);
})

jQuery(function($) {
  $("#user-tel").mask("+7 (999) 99 99 99");
  $("#modal-user-tel").mask("+7 (999) 99 99 99");
  $("#user-phone").mask("+7 (999) 99 99 99");
});

//Показ и скрытие ответов на вопросы в блоке FAQ
var faqItems = document.querySelectorAll('.faq__item');
var faqQuestions = document.querySelectorAll('.faq__question');
var faqAnswers = document.querySelectorAll('.faq__answer');

var answersClickHandler = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function() {
      this.classList.toggle('faq__item--active');
    });
  }
}

answersClickHandler(faqItems);

// слайдер в блоке ОТЗЫВЫ
var reviewsSliderItems = document.querySelectorAll('.reviews__slider-item');
var reviewsButtonPrev = document.querySelector('.reviews__button--prev');
var reviewsButtonNext = document.querySelector('.reviews__button--next');
var reviewsNumberSlides = document.querySelector('.reviews__number-slides');
var reviewsSlideIndex = 1; //индекс слайда, который показывается сейчас

var showReviewsSlides = function(n) {
  if (n > reviewsSliderItems.length) {
    reviewsSlideIndex = 1;
  }
  if (n < 1) {
    reviewsSlideIndex = reviewsSliderItems.length;
  }

  for (var i = 0; i < reviewsSliderItems.length; i++) {
    reviewsSliderItems[i].style.display = 'none';
  }
  reviewsSliderItems[reviewsSlideIndex - 1].style.display = 'flex';
  reviewsNumberSlides.textContent = reviewsSlideIndex;
}

showReviewsSlides(reviewsSlideIndex);

var plusSlides = function(n) {
  showReviewsSlides(reviewsSlideIndex += n)
};

reviewsButtonPrev.addEventListener('click', function() {
  plusSlides(-1);
});

reviewsButtonNext.addEventListener('click', function() {
  plusSlides(1);
});

//слайдер в мобильной версии блока ЖИЗНЬ В ИЗРАИЛЕ
var mql = window.matchMedia('(max-width: 767px)');

function mediaQueryResponse(mql) {
  if (mql.matches) {
    var swiper = new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
}

mediaQueryResponse(mql);
