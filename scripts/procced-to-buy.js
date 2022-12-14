let cdoorNo = document.getElementById("doorNo");
let carea = document.getElementById("area");
let ccity = document.getElementById("city");
let cpincode = document.getElementById("pincode");
let userProfile, currentPerson;
let cconfirmBtn = document.getElementById("cconfirmBtn");
let ccancelBtn = document.getElementById("ccancelBtn");
let address = document.getElementById("address");
var df = 0;

async function displayAddress() {
  address.classList.remove("deliverSnackShow");
  userProfile = await getProfileData();
  currentPerson = await getCurrentUser();
  cdoorNo.placeholder = userProfile[currentPerson].doorno;
  cdoorNo.value = userProfile[currentPerson].doorno;
  carea.placeholder = userProfile[currentPerson].area;
  carea.value = userProfile[currentPerson].area;
  ccity.placeholder = userProfile[currentPerson].district;
  ccity.value = userProfile[currentPerson].district;
  cpincode.placeholder = userProfile[currentPerson].pincode;
  cpincode.value = userProfile[currentPerson].pincode;
}

async function deliveryAddressEdits() {
  address.classList.remove("deliverSnackShow");
  functionFlag = 1;
  userProfile = await getProfileData();
  currentPerson = await getCurrentUser();
  df = 1;
  cdoorNo.disabled = false;
  carea.disabled = false;
  ccity.disabled = false;
  cpincode.disabled = false;
  if (cdoorNo.value === "Doorno" || cdoorNo.value < 1) {
    cdoorNo.value = "";
    carea.value = "";
    ccity.value = "";
    cpincode.value = "";
  } else {
    cdoorNo.value = userProfile[currentPerson].doorno;
    carea.value = userProfile[currentPerson].area;
    ccity.value = userProfile[currentPerson].district;
    cpincode.value = userProfile[currentPerson].pincode;
  }
  cconfirmBtn.style.display = "block";
  ccancelBtn.style.display = "block";
}

async function addressEdits() {
  address.classList.add("deliverSnackShow");
  functionFlag = 1;
  userProfile = await getProfileData();
  currentPerson = await getCurrentUser();
  df = 1;
  cdoorNo.disabled = false;
  carea.disabled = false;
  ccity.disabled = false;
  cpincode.disabled = false;
  if (cdoorNo.value === "Doorno" || cdoorNo.value < 1) {
    cdoorNo.value = "";
    carea.value = "";
    ccity.value = "";
    cpincode.value = "";
  } else {
    cdoorNo.value = userProfile[currentPerson].doorno;
    carea.value = userProfile[currentPerson].area;
    ccity.value = userProfile[currentPerson].district;
    cpincode.value = userProfile[currentPerson].pincode;
  }
  cconfirmBtn.style.display = "block";
}

function noneBtn() {
  df = 0;
  address.classList.remove("deliverSnackShow");
  cconfirmBtn.style.display = "None";
  ccancelBtn.style.display = "None";
  cdoorNo.disabled = true;
  carea.disabled = true;
  ccity.disabled = true;
  cpincode.disabled = true;
}

async function updateProfileNames() {
  functionFlag = 0;
  if (df === 1) {
    if (cdoorNo.value.length < 1) {
      cdoorNo.setCustomValidity("Enter valid Door Number");
      cdoorNo.reportValidity();
    } else if (carea.value.length < 5) {
      carea.setCustomValidity("Enter valid area");
      carea.reportValidity();
    } else if (ccity.value.length < 2) {
      ccity.setCustomValidity("Enter valid district");
      ccity.reportValidity();
    } else if (cpincode.value.length < 6) {
      cpincode.setCustomValidity("Enter valid pincode");
      cpincode.reportValidity();
    } else {
      let object = {
        username: userProfile[currentPerson].username,
        useremail: userProfile[currentPerson].useremail,
        password: userProfile[currentPerson].password,
        doorno: cdoorNo.value,
        area: carea.value,
        district: ccity.value,
        pincode: cpincode.value,
      };
      await activeUserName(object);
      noneBtn();
    }
  }
}
