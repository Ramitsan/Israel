'use strict';

//Показ и закрытие модальных окон
var pageHeaderCallLink = document.querySelector('.page-header__call'); //ссылка
var modalRequestCall = document.querySelector('.request-call'); //модальное окно Заказать звонок
var modalCloseRequestCallButton = modalRequestCall.querySelector('.modal-close'); //кнопка закрытия
var modalAccepted = document.querySelector('.accepted'); //модальное окно Заявка принята
var modalCloseAcceptedButton = modalAccepted.querySelector('.modal-close'); //кнопка закрытия в окне Заявка принята
var modalOverlay = document.querySelector('.modal-overlay');
var usernameInput = modalRequestCall.querySelector('#modal-user-name'); //поле ввода имени
var usertelInput = modalRequestCall.querySelector('#modal-user-tel'); //поле ввода номера телефона
var agreement = modalRequestCall.querySelector('#agreement'); // чекбокс в форме
var modalRequestCallForm = modalRequestCall.querySelector('.request-call__form'); //форма внутри мод.окна
// var storageUserName = localStorage.getItem('username'); // имя, которое хранится в localStorage
// var storageUserTel = localStorage.getItem('usertel');  // телефон, который хранится в localStorage
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
    modalOverlay.classList.add('modal--show');
    disableScrollHandler();
    modalRequestCall.classList.remove('modal--show');
  }
}

var disableScrollHandler = function() {
  document.body.classList.add('body-scroll');
}

var activateScrollHandler = function() {
  document.body.classList.remove('body-scroll');
}


var closeOverlayHandler = function(popup) {
  modalOverlay.addEventListener('click', function() {
    popup.classList.remove('modal--show');
    modalOverlay.classList.remove('modal--show');
    activateScrollHandler();
  })
}

closeOverlayHandler(modalRequestCall);
closeOverlayHandler(modalAccepted);

pageHeaderCallLink.addEventListener('click', function(evt) {
  evt.preventDefault;
  modalRequestCall.classList.add('modal--show');
  modalOverlay.classList.add('modal--show');
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
  modalRequestCall.classList.remove('modal--show');
  modalOverlay.classList.remove('modal--show');
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

window.addEventListener('keydown', function(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    if (modalRequestCall.classList.contains('modal--show')) {
      evt.preventDefault();
      modalRequestCall.classList.remove('modal--show');
      modalOverlay.classList.remove('modal--show');
      activateScrollHandler();
    }
    if (modalAccepted.classList.contains('modal--show')) {
      evt.preventDefault();
      modalAccepted.classList.remove('modal--show');
      modalOverlay.classList.remove('modal--show');
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
    modalAccepted.classList.remove('modal--show');
    modalOverlay.classList.remove('modal--show');
    activateScrollHandler();
  } else {
    wanttogoUserPhoneInput.style.borderColor = 'rgba(72, 72, 72, 0.5)';
    modalAccepted.classList.add('modal--show');
    modalOverlay.classList.add('modal--show');
    disableScrollHandler();
  }
}

wantToGoForm.addEventListener('submit', function(evt) {
  evt.preventDefault();
  validateWanttogoForm();
})

modalCloseAcceptedButton.addEventListener('click', function(evt) {
  evt.preventDefault();
  modalAccepted.classList.remove('modal--show');
  modalOverlay.classList.remove('modal--show');
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


var clickHandler = function(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', function() {
      this.classList.toggle('faq__item--active');
    });
  }
}

clickHandler(faqItems);

// слайдер в блоке ОТЗЫВЫ
var reviewsSliderItems = document.querySelectorAll('.reviews-slider__item');
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
var lifeSliderItems = document.querySelectorAll('.slider__item');
var lifeSliderTogglesWrap = document.querySelector('.slider__toggles');
var lifeSliderToggles = document.querySelectorAll('.slider__toggle');
var lifeSlideIndex = 1;
var maxWidthViewportMobile = 767;

var showLifeSlides = function(number) {
  if (number > lifeSliderItems.length) {
    lifeSlideIndex = 1;
  }
  if (number < 1) {
    lifeSlideIndex = lifeSliderItems.length;
  }
  for (var i = 0; i < lifeSliderItems.length; i++) {
    lifeSliderItems[i].style.display = 'none';
  }

  for (var j = 0; j < lifeSliderToggles.length; j++) {
    lifeSliderToggles[j].classList.remove('slider__toggle--active');
  }
  lifeSliderItems[lifeSlideIndex - 1].style.display = 'block';
  lifeSliderToggles[lifeSlideIndex - 1].classList.add('slider__toggle--active');
}

var mql = window.matchMedia('(max-width: 767px)');

function mediaQueryResponse(mql) {
  if (mql.matches) {
    showLifeSlides(lifeSlideIndex);
  }
}

mediaQueryResponse(mql);

window.addEventListener('resize', function() {
  mediaQueryResponse(mql);
});

//получаем текущий слайд
var currentSlide = function(number) {
  showLifeSlides(lifeSlideIndex = number)
};

lifeSliderTogglesWrap.addEventListener('click', function(evt) {
  for (var i = 0; i < lifeSliderToggles.length + 1; i++) {
    if (evt.target.classList.contains('slider__toggle') && evt.target === lifeSliderToggles[i - 1]) {
      currentSlide(i);
    }
  }
});
