'use strict';

//Показ и закрытие модальных окон
 var pageHeaderCallLink = document.querySelector('.page-header__call'); //ссылка
 var modalRequestCall = document.querySelector('.request-call'); //модальное окно
 var modalCloseRequestCall = modalRequestCall.querySelector('.modal-close'); //кнопка закрытия
 var username = modalRequestCall.querySelector('#modal-user-name'); //поле ввода имени
 var usertel = modalRequestCall.querySelector('#modal-user-tel'); //поле ввода номера телефона
 var agreement = modalRequestCall.querySelector('#agreement'); // чекбокс в форме
 var modalRequestCallForm = modalRequestCall.querySelector('.request-call__form'); //форма внутри мод.окна
 // var storageUserName = localStorage.getItem('username'); // имя, которое хранится в localStorage
 // var storageUserTel = localStorage.getItem('usertel');  // телефон, который хранится в localStorage
 var isStorageSupport = true;
 var storageUserName = '';
 var storageUserTel = '';

 try {
   storageUserName = localStorage.getItem('username');
   storageUserTel = localStorage.getItem('usertel');
 } catch (err) {
   isStorageSupport = false;
 }

 pageHeaderCallLink.addEventListener('click', function(evt) {
   evt.preventDefault;
   modalRequestCall.classList.add('modal--show');
   username.focus();
   if (storageUserName) {
     username.value = storageUserName;
     usertel.focus();
   } else {
     username.focus();
   }
   if (storageUserTel) {
     usertel.value = storageUserTel;
     agreement.focus();
   }
 });

 modalCloseRequestCall.addEventListener('click', function(evt) {
   evt.preventDefault();
   modalRequestCall.classList.remove('modal--show');
   modalRequestCall.classList.remove('modal--error');
 });

 modalRequestCallForm.addEventListener('submit', function(evt) {
   if (!username.value || !usertel.value) {
     evt.preventDefault();
     modalRequestCall.classList.remove('modal--error');
     modalRequestCall.offsetWidth = modalRequestCall.offsetWidth;
     modalRequestCall.classList.add('modal--error');
   } else {
     if (isStorageSupport) {
       localStorage.setItem('username', username.value);
       localStorage.setItem('usertel', usertel.value);
     }
   }
 });

 window.addEventListener('keydown', function(evt) {
   if (evt.keyCode === 27) {
     if (modalRequestCall.classList.contains('modal--show')) {
       evt.preventDefault();
       modalRequestCall.classList.remove('modal--show');
       modalRequestCall.classList.remove('modal--error');
     }
   }
 });
