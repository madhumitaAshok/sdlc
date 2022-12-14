let subMenu = document.getElementById("sub-menu");
let pNmae = document.getElementById("pNmae");
let pEmail = document.getElementById("pEmail");
let pdoorNo = document.getElementById("pdoorNo");
let parea = document.getElementById("parea");
let pcity = document.getElementById("pcity");
let ppincode = document.getElementById("ppincode");
let confirmBtn = document.getElementById("confirmBtn");
let cancelBtn = document.getElementById("cancelBtn");
let profileData, activeUser;
var nflag = 0,
  dflag = 0;
var functionFlag = 0;

function hideAndDisplayProfile() {
  subMenu.classList.toggle("displayBlock");
}

async function updateCurrentDetails() {
  profileData = await getProfileData();
  activeUser = await getCurrentUser();
  pNmae.placeholder = profileData[activeUser].username;
  pEmail.placeholder = profileData[activeUser].useremail;
  pdoorNo.placeholder = profileData[activeUser].doorno;
  parea.placeholder = profileData[activeUser].area;
  pcity.placeholder = profileData[activeUser].district;
  ppincode.placeholder = profileData[activeUser].pincode;
}

async function pNameEdit() {
  functionFlag = 1;
  nflag = 1;
  pNmae.disabled = false;
  pNmae.value = pNmae.placeholder;
  pNmae.placeholder = "";
  confirmBtn.style.display = "block";
  cancelBtn.style.display = "block";
}

async function deliveryAddressEdit() {
  functionFlag = 1;
  profileData = await getProfileData();
  activeUser = await getCurrentUser();
  dflag = 1;
  pdoorNo.disabled = false;
  pdoorNo.placeholder = profileData[activeUser].doorno;
  pdoorNo.value = "";
  parea.disabled = false;
  parea.placeholder = profileData[activeUser].area;
  parea.value = "";
  pcity.disabled = false;
  pcity.placeholder = profileData[activeUser].district;
  pcity.value = "";
  ppincode.disabled = false;
  ppincode.placeholder = profileData[activeUser].pincode;
  ppincode.value = "";
  confirmBtn.style.display = "block";
  cancelBtn.style.display = "block";
}

function noneButtons() {
  nflag = 0;
  dflag = 0;
  confirmBtn.style.display = "None";
  cancelBtn.style.display = "None";
  pNmae.disabled = true;
  pdoorNo.disabled = true;
  pEmail.disabled = true;
  parea.disabled = true;
  pcity.disabled = true;
  ppincode.disabled = true;
}

async function noUpdate() {
  functionFlag = 0;
  noneButtons();
  noneBtn();
}

async function updateProfileName() {
  functionFlag = 0;
  if (nflag === 1) {
    if (pNmae.value.length < 1) {
      pNmae.setCustomValidity("Enter valid Name");
      pNmae.reportValidity();
    } else {
      let object = {
        username: pNmae.value,
        useremail: profileData[activeUser].useremail,
        password: profileData[activeUser].password,
        doorno: profileData[activeUser].doorno,
        area: profileData[activeUser].area,
        district: profileData[activeUser].district,
        pincode: profileData[activeUser].pincode,
      };
      await activeUserName(object);
      noneButtons();
    }
  }
  if (dflag === 1) {
    if (pdoorNo.value.length < 1) {
      pdoorNo.setCustomValidity("Enter valid Door Number");
      pdoorNo.reportValidity();
    } else if (parea.value.length < 5) {
      parea.setCustomValidity("Enter valid area");
      parea.reportValidity();
    } else if (pcity.value.length < 2) {
      pcity.setCustomValidity("Enter valid district");
      pcity.reportValidity();
    } else if (ppincode.value.length < 6) {
      ppincode.setCustomValidity("Enter valid pincode");
      ppincode.reportValidity();
    } else {
      let object = {
        username: profileData[activeUser].username,
        useremail: profileData[activeUser].useremail,
        password: profileData[activeUser].password,
        doorno: pdoorNo.value,
        area: parea.value,
        district: pcity.value,
        pincode: ppincode.value,
      };
      await activeUserName(object);
      noneButtons();
    }
  }
}
