//forms accessing
const loginForm = document.querySelector("#login-form");
const registrationForm = document.querySelector("#register-form");

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
    "[name='confirmPassword']"
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
