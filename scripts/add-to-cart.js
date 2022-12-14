async function addToCart(product, btnId, qtyId) {
  let goodName = product.toLowerCase();
  let category;
  if (groceryArray.includes(goodName)) {
    category = "grocery";
  } else if (fruitsArray.includes(goodName)) {
    category = "fruits";
  }
  if (vegetablesArray.includes(goodName)) {
    category = "vegetables";
  }
  if (houseHoldArray.includes(goodName)) {
    category = "houseHold";
  }
  let uniqueData = await getUniqueUserDetails();
  if (uniqueData[category][goodName].cart === true) {
    uniqueData[category][goodName].cart = false;
    btnId.innerHTML = "Add To Cart";
    uniqueData[category][goodName].qty = 0;
    btnId.classList.remove("btnColor");
  } else {
    uniqueData[category][goodName].cart = true;
    btnId.innerHTML = "Remove from Cart";
    btnId.classList.add("btnColor");
  }
  await updatedData(uniqueData);
  fetchQuantityDetails(qtyId, product);
}

async function addToCartFromHome(element, product) {
  displayNone(element);
  searchPage.style.display = "flex";
  searchItem.classList.add("showBox");
  createCard(product);
}

async function fetchQuantityDetails(id, value) {
  let goodName = value.toLowerCase();
  let category;
  if (groceryArray.includes(goodName)) {
    category = "grocery";
  } else if (fruitsArray.includes(goodName)) {
    category = "fruits";
  }
  if (vegetablesArray.includes(goodName)) {
    category = "vegetables";
  }
  if (houseHoldArray.includes(goodName)) {
    category = "houseHold";
  }
  let uniqueData = await getUniqueUserDetails();
  if (uniqueData[category][goodName].cart === true) {
    uniqueData[category][goodName].qty = parseInt(id.value);
    await updatedData(uniqueData);
  }
}

function updateQty(qty, id) {
  id.value = qty;
}
