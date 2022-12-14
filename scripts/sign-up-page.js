let validEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let validPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

function signupValidation() {
  let username = document.getElementById("susername");
  let useremail = document.getElementById("suser-email");
  let password = document.getElementById("spassword");

  if (
    username.value.length === 0 ||
    (username.value.length === 1 && specialChars.test(username.value))
  ) {
    username.setCustomValidity("Enter a valid name");
    username.reportValidity();
  } else {
    if (!useremail.value.match(validEmail)) {
      useremail.setCustomValidity("Enter a valid email");
      useremail.reportValidity();
    } else if (
      !(
        useremail.value.includes(".com") ||
        useremail.value.includes(".co") ||
        useremail.value.includes(".in")
      )
    ) {
      useremail.setCustomValidity("Enter a valid email");
      useremail.reportValidity();
    } else {
      if (password.value.length < 8) {
        password.setCustomValidity(`Enter a valid password`);
        password.reportValidity();
      } else {
        if (!password.value.match(validPassword)) {
          password.setCustomValidity(`Enter a valid password`);
          password.reportValidity();
        } else {
          let userdetails = {
            username: username.value,
            useremail: useremail.value,
            password: password.value,
            doorno: "Doorno",
            area: "Street, Area",
            district: "District",
            pincode: "Pincode",
          };
          getAndValidateUserData(userdetails);
        }
      }
    }
  }
}

function loginVerification() {
  let loginUseremail = document.getElementById("luser-email");
  let loginUserPassword = document.getElementById("lpassword");
  if (!loginUseremail.value.match(validEmail)) {
    loginUseremail.setCustomValidity("Enter a valid email");
    loginUseremail.reportValidity();
  } else if (
    !(
      loginUseremail.value.includes(".com") ||
      loginUseremail.value.includes(".co") ||
      loginUseremail.value.includes(".in")
    )
  ) {
    loginUseremail.setCustomValidity("Enter a valid email");
    loginUseremail.reportValidity();
  } else {
    if (loginUserPassword.value.length === 0) {
      loginUserPassword.setCustomValidity("Fill the Password Field");
      loginUserPassword.reportValidity();
    } else {
      if (!loginUserPassword.value.match(validPassword)) {
        loginUserPassword.setCustomValidity("Incorrect Password");
        loginUserPassword.reportValidity();
      } else {
        let loginUserDetails = {
          useremail: loginUseremail.value.toLowerCase(),
          userPassword: loginUserPassword.value,
        };
        getAndValidateLoginUserData(loginUserDetails);
      }
    }
  }
}
