/* RD Station forms: embedded ambassador form, dinner popup form, error translation */
(function () {
  'use strict';

  var RD_ACCOUNT = 'UA-122086213-1';
  var created = {};

  function createForm(id) {
    if (created[id] || !document.getElementById(id) || typeof window.RDStationForms !== 'function') return;
    created[id] = true;
    new window.RDStationForms(id, RD_ACCOUNT).createForm();
  }

  // Forms rendered straight into the page
  document.querySelectorAll('[data-rd-form]').forEach(function (el) {
    if (!el.closest('dialog')) createForm(el.id);
  });

  // Popups: <dialog id="popup-NAME"> opened by any [data-popup-open="NAME"]
  document.querySelectorAll('[data-popup-open]').forEach(function (trigger) {
    trigger.addEventListener('click', function (event) {
      var dialog = document.getElementById('popup-' + trigger.getAttribute('data-popup-open'));
      if (!dialog || typeof dialog.showModal !== 'function') return;
      event.preventDefault();
      dialog.querySelectorAll('[data-rd-form]').forEach(function (el) { createForm(el.id); });
      dialog.showModal();
    });
  });

  document.querySelectorAll('dialog.popup').forEach(function (dialog) {
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog || event.target.closest('.popup__close')) dialog.close();
    });
  });

  // RD Station renders its validation message in Portuguese; show it in English
  function translateErrors() {
    document.querySelectorAll('label.error').forEach(function (label) {
      if (label.textContent.trim() === 'Campo obrigatório') label.textContent = 'Required field';
    });
  }

  translateErrors();
  var interval = setInterval(translateErrors, 500);
  setTimeout(function () { clearInterval(interval); }, 15000);
  new MutationObserver(translateErrors).observe(document.body, { childList: true, subtree: true });
})();
