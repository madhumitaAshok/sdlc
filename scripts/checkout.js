let modal1 = document.getElementById("modal1");

function toggleModal() {
  updateStockQuantity();
  userFileUpdate();
  modal1.classList.toggle("show-modal");
  setTimeout(function () {
    modal1.classList.toggle("show-modal");
    directToHomePage(checkoutPage);
  }, 5000);
}

async function userFileUpdate() {
  let stockQuantity = await getUniqueUserDetails();
  Object.values(stockQuantity).forEach((element) => {
    Object.values(element).forEach(async (element) => {
      let category;
      if (groceryArray.includes(element.name.toLowerCase())) {
        category = "grocery";
      } else if (fruitsArray.includes(element.name.toLowerCase())) {
        category = "fruits";
      }
      if (vegetablesArray.includes(element.name.toLowerCase())) {
        category = "vegetables";
      }
      if (houseHoldArray.includes(element.name.toLowerCase())) {
        category = "houseHold";
      }
      stockQuantity[category][element.name.toLowerCase()].cart = false;
      stockQuantity[category][element.name.toLowerCase()].qty = 0;
    });
  });
  updatedData(stockQuantity);
}

async function updateStockQuantity() {
  let stockQuantity = await getUniqueUserDetails();
  Object.values(stockQuantity).forEach((element) => {
    Object.values(element).forEach(async (element) => {
      if (element.qty > 0) {
        let wareHouseStock = await getCardDetails();
        let category;
        if (groceryArray.includes(element.name.toLowerCase())) {
          category = "grocery";
        } else if (fruitsArray.includes(element.name.toLowerCase())) {
          category = "fruits";
        }
        if (vegetablesArray.includes(element.name.toLowerCase())) {
          category = "vegetables";
        }
        if (houseHoldArray.includes(element.name.toLowerCase())) {
          category = "houseHold";
        }
        wareHouseStock[category][element.name.toLowerCase()].cart = false;
        wareHouseStock[category][element.name.toLowerCase()].cost =
          element.cost;
        wareHouseStock[category][element.name.toLowerCase()].name =
          element.name;
        wareHouseStock[category][element.name.toLowerCase()].qty = 0;
        wareHouseStock[category][element.name.toLowerCase()].stock =
          element.stock - element.qty;
        wareHouseStock[category][element.name.toLowerCase()].unit =
          element.unit;
        updateWareHouseStock(wareHouseStock);
      }
    });
  });
}
