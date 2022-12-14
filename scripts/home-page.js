let searchDropDown = document.getElementById("searchItems");
let searchBar = document.getElementById("searchBar");
let heading = document.getElementById("top");
let container = document.getElementById("container");
let searchItem = document.getElementById("searchItem");
let searchBar2 = document.getElementById("searchBar2");
let searchBar4 = document.getElementById("searchBar4");
let searchBar5 = document.getElementById("searchBar5");
let searchBar7 = document.getElementById("searchBar7");
let searchSnackBar = document.getElementById("searchSnackBar");
let searchSnackBar2 = document.getElementById("searchSnackBar2");
let searchSnackBar3 = document.getElementById("searchSnackBar3");
let searchSnackBar7 = document.getElementById("searchSnackBar7");
let searchSnackBar6 = document.getElementById("searchSnackBar6");
let searchBarSearch = document.getElementById("searchBarSearch");
let proceedToBuy = document.getElementById("proceedToBuy");
let gridContainer = document.getElementById("gridContainer");
let groceryId = document.getElementById("grocery");
let fruitsId = document.getElementById("fruits");
let vegetablesId = document.getElementById("vegetables");
let houseHold = document.getElementById("houseHold");
let c = 0;

let groceryArray = [
  "milk",
  "salt",
  "sugar",
  "jam",
  "sauce",
  "atta",
  "ragiflour",
  "greengram",
  "chips",
  "chocolate",
  "maggi",
  "oil",
  "honey",
  "butter",
  "boost",
];

let fruitsArray = [
  "apple",
  "orange",
  "guava",
  "grapes",
  "strawberry",
  "mango",
  "banana",
  "cherry",
  "watermelon",
  "pomegranates",
];

let vegetablesArray = [
  "asparagus",
  "bellpeppers",
  "beets",
  "broccoli",
  "carrot",
  "cauliflower",
  "eggplant",
  "garlic",
  "onion",
  "tomato",
  "potato",
  "spinach",
  "mushroom",
  "chives",
];

let houseHoldArray = [
  "toothpaste",
  "shampoo",
  "handwash",
  "dishwash",
  "scrubber",
  "towel",
  "broom",
  "scissors",
  "mop",
  "floorwash",
  "sanitizer",
  "bucket",
];

async function createCard(product) {
  searchItem.replaceChildren();
  let item = product.toLowerCase();
  c = 0;
  for (const productGroup in allData) {
    if (allData[productGroup][item]) {
      let value = allData[productGroup][item];
      let stockDetails = await getCardDetails();
      let stock = stockDetails[productGroup][item].stock;
      let details = await fetchQty(productGroup, item);
      let qty = details[productGroup][item].qty;
      let btnTextBool = details[productGroup][item].cart;
      let btnTxt;
      let btnClass;
      if (btnTextBool === true) {
        btnTxt = "Remove from Cart";
        btnClass = "btnColor";
      } else {
        btnTxt = "Add to cart";
        btnClass = "quantity";
      }
      if (stock > 10) {
        let card = `<div class="productTile">
      <img
    class="productImage"
    src="./assets/${item}.jpg"
    alt="productImage"
    />
    <div class="productDetails">
    <div id="${value.name}" class="detailsStyle productName">${value.name}</div>
    <div class="detailsStyle productPrice">Rs.${value.cost} /${value.unit}</div>
    </div>
    <div class="productQuantityDetails">
    <button id="button_${c}" class=${btnClass} onclick="addToCart('${value.name}',button_${c},quantity_${c})">${btnTxt}</button>
    <select class="productQuantity" id="quantity_${c}" onchange="fetchQuantityDetails(quantity_${c},'${value.name}')">
      <option value=1>1</option>
      <option value=2>2</option>
      <option value=3>3</option>
      <option value=4>4</option>
      <option value=5>5</option>
      <option value=6>6</option>
      <option value=7>7</option>
      <option value=8>8</option>
      <option value=9>9</option>
      <option value=10>10</option>
    </select>
    </div>`;
        searchItem.innerHTML = card;
        let select = document.getElementById(`quantity_${c}`);
        if (qty > 1) {
          select[qty - 1].setAttribute("selected", "selected");
        }
      } else {
        let card = `<div class="productTile">
      <img
    class="productImage"
    src="./assets/${item}.jpg"
    alt="productImage"
    />
    <div class="productDetails">
    <div id="${value.name}" class="detailsStyle productName">${value.name}</div>
    <div class="detailsStyle productPrice">Rs.${value.cost} /${value.unit}</div>
    </div>
    <div class="outOfStock">
    <img
        class="osImage"
        src="./assets/outOfStock.png"
        alt="Out of stock Image"
      />
    </div>
    </div>`;
        searchItem.innerHTML = card;
      }
    }
  }
}

async function createCategoryCard(category, goods) {
  let goodsDetails = allData[category][goods];
  let stockDetails = await getCardDetails();
  let stock = stockDetails[category][goods].stock;
  let details = await fetchQty(category, goods);
  let qty = details[category][goods].qty;
  let btnTextBool = details[category][goods].cart;
  let btnTxt;
  let btnClass;
  if (btnTextBool === true) {
    btnTxt = "Remove from Cart";
    btnClass = "btnColor";
  } else {
    btnTxt = "Add to cart";
    btnClass = "quantity";
  }
  if (stock > 10) {
    let card = `<div class="productCard">
    <div class="productImageContainer">
      <img
        class="productImage"
        src="./assets/${goods}.jpg"
        alt="productImage"
      />
    </div>
    <div class="productDetails">
      <div id="${goodsDetails.name}" class="detailsStyle productName">${goodsDetails.name}</div>
      <div class="detailsStyle productPrice">Rs.${goodsDetails.cost} /${goodsDetails.unit}</div>
    </div>
    <div class="productQuantityDetails">
      <button id="btn_${c}" class=${btnClass} onclick="addToCart('${goodsDetails.name}',btn_${c},qty_${c})">${btnTxt}</button>
      <select class="productQuantity" id="qty_${c}" onchange="fetchQuantityDetails(qty_${c},'${goodsDetails.name}')">
      <option value=1>1</option>
      <option value=2>2</option>
      <option value=3>3</option>
      <option value=4>4</option>
      <option value=5>5</option>
      <option value=6>6</option>
      <option value=7>7</option>
      <option value=8>8</option>
      <option value=9>9</option>
      <option value=10>10</option>
      </select>
    </div>
  </div>`;
    gridContainer.innerHTML += card;
    let select = document.getElementById(`qty_${c}`);
    if (qty > 1) {
      select[qty - 1].setAttribute("selected", "selected");
    }
    c++;
  } else {
    let card = `<div class="productCard">
    <div class="productImageContainer">
      <img
        class="productImage"
        src="./assets/${goods}.jpg"
        alt="productImage"
      />
    </div>
    <div class="productDetails">
      <div id="${goodsDetails.name}" class="detailsStyle productName">${goodsDetails.name}</div>
      <div class="detailsStyle productPrice">Rs.${goodsDetails.cost} /${goodsDetails.unit}</div>
    </div>
    <div class="outOfStock">
    <img
        class="osImage"
        src="./assets/outOfStock.png"
        alt="Out of stock Image"
      />
    </div>
  </div>`;
    gridContainer.innerHTML += card;
    c++;
  }
}

searchBar.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchProductOtherPage(homePage, searchBar, searchSnackBar);
  }
});

searchBarSearch.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchProductOtherPage(searchPage, searchBarSearch, searchSnackBar2);
  }
});

searchBar2.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchProductOtherPage(categoryPage, searchBar2, searchSnackBar3);
  }
});

searchBar7.addEventListener("keypress", function (event) {
  if (event.key === "Enter" && functionFlag != 1) {
    searchProductOtherPage(profilePage, searchBar7, searchSnackBar7);
  } else {
    displayPopUp();
    page = "profile";
  }
});

searchBar4.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchProductOtherPage(cartPage, searchBar4, searchSnackBar7);
  }
});

searchBar5.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchProductOtherPage(checkoutPage, searchBar5, searchSnackBar6);
  }
});

function removeBg() {
  groceryId.classList.remove("bgColor");
  fruitsId.classList.remove("bgColor");
  vegetablesId.classList.remove("bgColor");
  houseHold.classList.remove("bgColor");
}

function directToHomePage(element) {
  removeBg();
  searchBar.value = "";
  if (element === homePage) {
  } else {
    displayNone(element);
    homePage.style.display = "flex";
  }
}

function directToCart(element) {
  removeBg();
  searchBar4.value = "";
  if (element === cartPage) {
  } else {
    displayNone(element);
    cartPage.style.display = "flex";
  }
  getCartProducts();
}

function directToProfilePage() {
  removeBg();
  searchBar7.value = "";
  displayNone(searchPage);
  displayNone(loginPage);
  displayNone(signUpPage);
  displayNone(homePage);
  displayNone(categoryPage);
  displayNone(cartPage);
  displayNone(checkoutPage);
  profilePage.style.display = "flex";
  hideAndDisplayProfile();
  updateCurrentDetails();
}

function logout() {
  location.reload();
}

function profileTabHide() {
  subMenu.classList.remove("displayBlock");
}

async function directToCheckout(element) {
  if (cartItems.childNodes.length > 0 && amount != 0) {
    removeBg();
    searchBar5.value = "";
    if (element === checkoutPage) {
    } else {
      displayNone(element);
      checkoutPage.style.display = "flex";
      await displayAddress();
      if (cdoorNo.value === "" || cdoorNo.value === "Doorno") {
        addressEdits();
      }
      orderSummary.innerHTML = `Total cost is Rs.${amount}`;
    }
  } else if (cartItems.childNodes.length === 0) {
    cartItems.style.backgroundImage = "url('../assets/emptyCart.jpg')";
    cartItems.style.backgroundRepeat = "no-repeat";
    cartItems.style.backgroundSize = "cover";
    proceedToBuy.setCustomValidity("Select items from cart to proceed");
    proceedToBuy.reportValidity();
  } else {
    proceedToBuy.setCustomValidity("Select items from cart to proceed");
    proceedToBuy.reportValidity();
  }
}

function searchProductOtherPage(element, searchBarId, snackBarId) {
  let product = searchBarId.value;
  let count = 0;
  productNames.forEach((names) => {
    if (names.toLowerCase() === product.toLowerCase()) {
      displayNone(element);
      searchPage.style.display = "flex";
      searchItem.classList.add("showBox");
      createCard(product);
    } else {
      count++;
    }
  });
  if (count % 51 === 0 || product === "") {
    snackBarId.classList.add("show");
    setTimeout(function () {
      snackBarId.classList.remove("show");
    }, 3000);
  }
  searchBarSearch.value = product;
}

async function fetchQty(product, value) {
  let uniqueDetails = await getUniqueUserDetails();
  return uniqueDetails;
}

function categoryWiseCards(category) {
  removeBg();
  document.getElementById(category).classList.add("bgColor");
  gridContainer.replaceChildren();
  count = 0;
  Object.keys(allData[category]).forEach((values) => {
    createCategoryCard(category, values);
  });
}

function directToShoppingPage(category, element) {
  searchBar2.value = "";
  displayNone(element);
  categoryPage.style.display = "flex";
  categoryWiseCards(category);
}

function homePageFunctions() {
  (function appendProductNames() {
    productNames.sort();
    if (searchDropDown.options.length < productNames.length) {
      productNames.forEach((element) => {
        let option = document.createElement("option");
        option.value = element;
        searchDropDown.appendChild(option);
      });
    }
  })();
}
