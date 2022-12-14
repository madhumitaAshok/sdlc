let cartItems = document.getElementById("cartItems");
let cost = document.getElementById("cost");
let totalCost = document.getElementById("cost-color");
let orderSummary = document.getElementById("orderSummary");
let count, amount, itemsCount;
let CheckItemsCount = 0;
let select = document.getElementById("checkBox");

async function getCartProducts() {
  cartItems.replaceChildren();
  cartItems.style.backgroundImage = "";
  let uniqueData = await getUniqueUserDetails();
  let category = Object.keys(uniqueData);
  let checkBoxFlag = 0;
  CheckItemsCount++;

  itemsCount = 0;
  count = 1;
  select.addEventListener("click", () => {
    if (select.checked == true) {
      for (let i = 1; i < count; i++) {
        if (document.getElementById(`checkBox_${i}`))
          document.getElementById(`checkBox_${i}`).checked = true;
      }
      updateTotalAmountInCart();
    } else {
      for (let i = 1; i < count; i++) {
        if (document.getElementById(`checkBox_${i}`))
          document.getElementById(`checkBox_${i}`).checked = false;
      }
      updateTotalAmountInCart();
    }
  });
  totalCost.innerHTML = "0";
  cost.innerHTML = "0";
  for (let i = 0; i < category.length; i++) {
    let categoryOption = Object.keys(uniqueData[category[i]]);
    for (let j = 0; j < categoryOption.length; j++) {
      if (uniqueData[category[i]][categoryOption[j]].cart) {
        checkBoxFlag = 1;
        document.getElementById(
          "no-of-items"
        ).innerHTML = `Price ( ${count} Items)`;
        let price =
          uniqueData[category[i]][categoryOption[j]].cost *
          uniqueData[category[i]][categoryOption[j]].qty;
        if (cost.innerHTML.length != 0) {
          totalCost.innerHTML =
            "Rs." + (price + Number(cost.innerHTML.match(/\d+/g)[0]));
          cost.innerHTML =
            "Rs." + (price + Number(cost.innerHTML.match(/\d+/g)[0]));
          amount = Number(cost.innerHTML.match(/\d+/g)[0]);
        } else {
          cost.innerHTML = "Rs." + price;
          totalCost.innerHTML = "Rs." + price;
          amount = Number(cost.innerHTML.match(/\d+/g)[0]);
        }
        let productCard = ` <div class="cartProduct" id="cartProduct_${count}">
    <input type="checkbox" id="checkBox_${count}" class="checkBox selectBox" onclick="updateTotalAmountInCart()" checked/>
    <div class="name" id="name_${count}">${
          uniqueData[category[i]][categoryOption[j]].name
        }</div>
    <div class="price" id="price_${count}">${price}</div>
    <input min="1" max="10" type="number" id="inputBox_${count}" class="productQuantity border" style="text-align:center" value=${
          uniqueData[category[i]][categoryOption[j]].qty
        } onchange=quantityChange(inputBox_${count},${
          uniqueData[category[i]][categoryOption[j]].cost
        },price_${count},name_${count})>
    <img
      class="deleteLogo"
      src="./assets/remove.png"
      alt="Remove icon"
      onclick="removeEachItem(
        name_${count},cartProduct_${count},price_${count},checkBox_${count})"
    />
  </div>`;
        cartItems.innerHTML += productCard;
        count++;
        itemsCount++;
      }
    }
  }
  if (cartItems.childElementCount === 0) {
    cartItems.style.backgroundImage = "url('../assets/emptyCart.jpg')";
    cartItems.style.backgroundRepeat = "no-repeat";
    cartItems.style.backgroundSize = "cover";
  }
  if (checkBoxFlag === 0) {
    select.checked = false;
  } else {
    select.checked = true;
  }
}

function quantityChange(quantityId, cost, PriceId, nameId) {
  fetchQuantity(quantityId, nameId);
  updateProductPrice(quantityId, cost, PriceId);
}

async function fetchQuantity(id, nameId) {
  let goodName = nameId.innerHTML.toLowerCase();
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

function updateProductPrice(quantityId, cost, PriceId) {
  let qty = quantityId.value;
  let price = qty * cost;
  PriceId.innerHTML = price;
  updateTotalAmountInCart();
}

function updateTotalAmountInCart() {
  let price = 0,
    flag = 1;

  for (let i = 1; i < count; i++) {
    if (document.getElementById(`checkBox_${i}`)) {
      if (document.getElementById(`checkBox_${i}`).checked === true) {
        price += Number(document.getElementById(`price_${i}`).innerHTML);
      } else {
        document.getElementById("checkBox").checked = false;
        flag = 0;
      }
    }
  }
  if (flag === 1) {
    document.getElementById("checkBox").checked = true;
  }
  if (price === 0) document.getElementById("checkBox").checked = false;
  document.getElementById("cost").innerHTML = `Rs.${price}`;
  document.getElementById("cost-color").innerHTML = `Rs.${price}`;
  amount = Number(cost.innerHTML.match(/\d+/g)[0]);
}

function emptyCart() {
  cartItems.replaceChildren();
  userFileUpdate();
  select.checked = false;
  totalCost.innerHTML = "Rs. 0";
  cost.innerHTML = "Rs. 0";
  amount = 0;
  document.getElementById("no-of-items").innerHTML = `Price ( 0 Item)`;
  cartItems.style.backgroundImage = "url('../assets/emptyCart.jpg')";
  cartItems.style.backgroundRepeat = "no-repeat";
  cartItems.style.backgroundSize = "cover";
}

async function removeEachItem(itemName, itemId, priceId, checkBoxId) {
  let price = parseInt(priceId.innerHTML);
  itemName = itemName.innerHTML.toLowerCase();
  let category;
  if (groceryArray.includes(itemName)) {
    category = "grocery";
  } else if (fruitsArray.includes(itemName)) {
    category = "fruits";
  }
  if (vegetablesArray.includes(itemName)) {
    category = "vegetables";
  }
  if (houseHoldArray.includes(itemName)) {
    category = "houseHold";
  }
  let uniqueData = await getUniqueUserDetails();
  uniqueData[category][itemName].cart = false;
  uniqueData[category][itemName].qty = 0;
  await updatedData(uniqueData);
  if (checkBoxId.checked == true) {
    totalCost.innerHTML =
      "Rs." + (Number(cost.innerHTML.match(/\d+/g)[0]) - price);
    cost.innerHTML = "Rs." + (Number(cost.innerHTML.match(/\d+/g)[0]) - price);
    amount = Number(cost.innerHTML.match(/\d+/g)[0]);
  }
  itemId.remove();
  let countCycle = 1,
    sflag = 0;
  for (i = 1; i < count; i++) {
    if (!document.getElementById(`checkBox_${i}`)) {
      countCycle++;
    } else if (document.getElementById(`checkBox_${i}`).checked === true) {
      countCycle++;
      sflag = 1;
    }
  }
  if (countCycle === count && sflag === 1) {
    select.checked = true;
  } else {
    select.checked = false;
  }
  itemsCount--;
  document.getElementById(
    "no-of-items"
  ).innerHTML = `Price ( ${itemsCount} Item)`;
  if (parseInt(amount) === 0) {
    cartItems.replaceChildren();
  }
  if (cartItems.childElementCount === 0) {
    cartItems.style.backgroundImage = "url('../assets/emptyCart.jpg')";
    cartItems.style.backgroundRepeat = "no-repeat";
    cartItems.style.backgroundSize = "cover";
  }
}
