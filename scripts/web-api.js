let loginSnackbar = document.getElementById("loginSnackbar");
let snackbar = document.getElementById("snackbar");
let lemail = document.getElementById("luser-email");
let lpassword = document.getElementById("lpassword");
let productNames = [];
let allData = {};

async function newUserLog(userdetails) {
  try {
    let signUpValidation = await fetch(`http://localhost:5500/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdetails),
    });
    if (signUpValidation.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error");
  }
}

async function writeDetails(details, fileName) {
  let obj = {
    details: details,
    fileName: fileName,
  };
  try {
    await fetch(`http://localhost:5500/write`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  } catch (error) {
    console.log("Error");
  }
}

async function existingUserLog(loginUserDetails) {
  try {
    let loginValidation = await fetch(`http://localhost:5500/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserDetails),
    });
    if (loginValidation.status === 200) {
      return "valid";
    } else if (loginValidation.status === 205) {
      return "wrongpassword";
    } else {
      return "notfound";
    }
  } catch (error) {
    console.log("Error");
  }
}

async function updatedData(updatedData) {
  try {
    let loginValidation = await fetch(`http://localhost:5500/updateData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
  } catch (error) {
    console.log("Error");
  }
}

async function activeUserName(activeData) {
  try {
    let loginValidation = await fetch(`http://localhost:5500/activeUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activeData: activeData }),
    });
  } catch (error) {
    console.log("Error");
  }
}

async function activeUserNameUpdate(activeData) {
  try {
    let loginValidation = await fetch(`http://localhost:5500/activeData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activeData),
    });
  } catch (error) {
    console.log("Error");
  }
}

async function getUniqueUserDetails() {
  try {
    let productDetails = await fetch(`http://localhost:5500/uniqueData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return productDetails.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getProfileData() {
  try {
    let productDetails = await fetch(`http://localhost:5500/profileData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return productDetails.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getCurrentUser() {
  try {
    let productDetails = await fetch(`http://localhost:5500/currentUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return productDetails.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getSearchBarData() {
  try {
    let productDetails = await fetch(`http://localhost:5500/getProductNames`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return productDetails.json();
  } catch (error) {
    console.log("Error");
  }
}

async function getCardDetails() {
  try {
    let productDetails = await fetch(`http://localhost:5500/totalData`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return productDetails.json();
  } catch (error) {
    console.log("Error");
  }
}

async function updateWareHouseStock(wareHouseStock) {
  try {
    let wareHouseUpdation = await fetch(
      `http://localhost:5500/updateWareHouse`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wareHouseStock: wareHouseStock }),
      }
    );
  } catch (error) {
    console.log("Error");
  }
}

async function getAndValidateUserData(userdetails) {
  let validUser = await newUserLog(userdetails);
  let writeDetail = await writeDetails(allData, userdetails.useremail);
  if (validUser) {
    loginSnackbar.innerText = "Account created successfully.Login to Continue";
    loginSnackbar.classList.add("show");
    setTimeout(function () {
      loginSnackbar.classList.remove("show");
    }, 3000);
    directToLoginPage(signUpPage);
  } else {
    snackbar.classList.add("show");
  }
}

async function getAndValidateLoginUserData(loginUserDetails) {
  let validLoginUser = await existingUserLog(loginUserDetails);
  switch (validLoginUser) {
    case "valid":
      directToHomePage(loginPage);
      break;
    case "wrongpassword":
      loginSnackbar.innerText = "Incorrect Password";
      loginSnackbar.classList.add("show");
      setTimeout(function () {
        loginSnackbar.classList.remove("show");
      }, 3000);
      lpassword.classList.add("errorDisplay");
      setTimeout(function () {
        lpassword.classList.remove("errorDisplay");
      }, 3000);
      break;
    case "notfound":
      loginSnackbar.innerText = "Account doesn't exist";
      loginSnackbar.classList.add("show");
      setTimeout(function () {
        loginSnackbar.classList.remove("show");
      }, 3000);
      lemail.classList.add("errorDisplay");
      setTimeout(function () {
        lemail.classList.remove("errorDisplay");
      }, 3000);
      break;
  }
}

async function fetchData() {
  productNames = await getSearchBarData();
  allData = await getCardDetails();
}

function onLoadFunctions() {
  fetchData().then(() => {
    homePageFunctions();
  });
}

window.onload = onLoadFunctions();
