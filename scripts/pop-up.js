let confirm = document.getElementById("confirm-delete-account");
let deletePopUp = document.getElementById("delete-pop-up");
let page;

function displayPopUp() {
  confirm.classList.add("visible");
}

function displaydeletePopUp() {
  deletePopUp.classList.add("visible");
  setTimeout(function () {
    deletePopUp.classList.remove("visible");
  }, 5000);
}

function removePopUp() {
  deletePopUp.classList.remove("visible");
}

function btnupdateProfileName() {
  updateProfileName();
  confirm.classList.remove("visible");
  switch (page) {
    case "home":
      directToHomePage(profilePage);
      break;
    case "hide":
      hideAndDisplayProfile();
      break;
    case "cart":
      directToCart(profilePage);
      break;
    case "profile":
      searchProductOtherPage(profilePage, searchBar7, searchSnackBar7);
      break;
  }
}

function btnnoUpdate() {
  confirm.classList.remove("visible");
}

function checkForCompletionAndDirectToHome(element) {
  if (functionFlag === 1) {
    displayPopUp();
    page = "home";
  } else {
    directToHomePage(element);
  }
}

function checkForCompletionAndDirectToProfile() {
  if (functionFlag === 1) {
    displayPopUp();
    page = "hide";
  } else {
    hideAndDisplayProfile();
  }
}

function checkForCompletionAndDirectToCart(element) {
  if (functionFlag === 1) {
    displayPopUp();
    page = "cart";
  } else {
    directToCart(element);
  }
}

function checkForCompletionAndDirectToSearchPage(element1, element2, element3) {
  if (functionFlag === 1) {
    displayPopUp();
    page = "profile";
  } else {
    searchProductOtherPage(element1, element2, element3);
  }
}

function finalPayement() {
  if (functionFlag === 1) {
    displaydeletePopUp();
  } else {
    toggleModal();
  }
}
