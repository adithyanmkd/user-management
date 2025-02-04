//forms accessing
const loginForm = document.querySelector("#login-form");
const registrationForm = document.querySelector("#register-form");
const adminSideUserAddForm = document.querySelector("#admin-side-user-add");
const adminSideUserEditForm = document.querySelector("#admin-side-edit-user");
const adminLoginForm = document.querySelector("#admin-login-form");

//error output box and p tag
const errorBox = document.querySelector("#error-box");
const errorBoxP = document.querySelector("#error-box-p");

//"user not found" message hiding
setTimeout(() => {
  const messageElement = document.getElementById("loginMessage");
  if (messageElement) {
    messageElement.style.display = "none";
  }
}, 3000);

//message and box showing if required filed not fill
const messageOutputFunction = (e, message) => {
  e.preventDefault();
  errorBox.classList.remove("hidden");
  errorBox.classList.add("flex");
  errorBoxP.innerHTML = message;
};

if (loginForm) {
  const email = loginForm.querySelector("[name='email']");
  const password = loginForm.querySelector("[name='password']");

  //login form validation
  loginForm.addEventListener("submit", (e) => {
    if (email.value == "") {
      messageOutputFunction(e, "email is required");
    } else if (password.value == "") {
      messageOutputFunction(e, "password required");
    }
  });
}

if (registrationForm) {
  //registration form field accessing
  const regUsername = registrationForm.querySelector("[name='username']");
  const regPassword = registrationForm.querySelector("[name='password']");
  const confirmPassword = registrationForm.querySelector(
    "[name='confirmPassword']",
  );
  const email = registrationForm.querySelector("[name='email']");

  //register form validation
  registrationForm.addEventListener("submit", (e) => {
    let passwordValue = regPassword.value;
    let confirmPassValue = confirmPassword.value;

    if (regUsername.value == "") {
      messageOutputFunction(e, "username required");
    } else if (email.value == "") {
      messageOutputFunction(e, "email is required");
    } else if (passwordValue == "" || passwordValue.length < 8) {
      if (passwordValue.length < 8) {
        console.log(passwordValue.length);
        messageOutputFunction(e, "password must be 8 characters");
      } else {
        messageOutputFunction(e, "Password cannot be empty");
      }
    } else if (confirmPassValue != passwordValue) {
      messageOutputFunction(e, "password not matched");
    }
  });
}

if (adminSideUserAddForm) {
  const popUpScreen = document.querySelector("#pop-up-screen");
  const closePopUp = document.querySelector("#closeBtn");
  const addUserBtn = document.querySelector("#add-user-btn");

  //popup screen opening while clicking add user btn
  addUserBtn.addEventListener("click", () => {
    popUpScreen.style.display = "block";
  });

  //popup closing
  closePopUp.addEventListener("click", () => {
    popUpScreen.style.display = "none";
  });
}

if (adminSideUserEditForm) {
  const editUserBtn = document.querySelector("#edit-btn");
  const editPopUp = document.querySelector("#edit-pop-up-screen");
  const closeBtn = document.querySelector("#editCloseBtn");

  //pop up screen opening while clicking edit user btn
  // editUserBtn.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   editPopUp.style.display = "block";
  // });

  //popup closing
  closeBtn.addEventListener("click", () => {
    editPopUp.style.display = "none";
  });
}

if (adminLoginForm) {
  const username = adminLoginForm.querySelector("[name='username']");
  const password = adminLoginForm.querySelector("[name='password']");
  console.log(username);

  adminLoginForm.addEventListener("submit", (e) => {
    if (username.value == "" || password.value == "") {
      messageOutputFunction(e, "All fields required");
    }
  });
}
