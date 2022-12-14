let startUpPage = document.getElementById("startUpPage");
let loginPage = document.getElementById("loginPage");
let signUpPage = document.getElementById("signUpPage");
let homePage = document.getElementById("homePage");
let categoryPage = document.getElementById("categoryPage");
let searchPage = document.getElementById("searchPage");
let profilePage = document.getElementById("profilePage");
let cartPage = document.getElementById("cartPage");
let checkoutPage = document.getElementById("checkoutPage");

function displayNone(element) {
  element.style.display = "none";
}

function directToLoginPage(element) {
  displayNone(element);
  loginPage.style.display = "flex";
}

function directToSignUpPage(element) {
  displayNone(element);
  signUpPage.style.display = "flex";
}

function onloadInvokables() {
  displayNone(searchPage);
  displayNone(loginPage);
  displayNone(signUpPage);
  displayNone(homePage);
  displayNone(categoryPage);
  displayNone(profilePage);
  displayNone(cartPage);
  displayNone(checkoutPage);
}

window.onload = onloadInvokables();
