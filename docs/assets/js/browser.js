"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentBrowser = getCurrentBrowser;
exports.setCurrentBrowser = setCurrentBrowser;
exports.setup = setup;
// Handles keeping track of what browser is used and displaying it in the UI
//@ts-check
// @ts-ignore
var
/** @type {HTMLSelectElement} */
choice = document.getElementById('browser');

function getCurrentBrowser() {
  return localStorage.getItem('browser') || 'select';
}

function setCurrentBrowser(browser) {
  var choiceTrigger = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  localStorage.setItem('browser', browser);

  if (!choiceTrigger) {
    updateChoicePrompt();
  }
}

function setup() {
  choice.onchange = function () {
    setCurrentBrowser(choice.value, true);
  };
}

function updateChoicePrompt() {
  choice.value = getCurrentBrowser();
}