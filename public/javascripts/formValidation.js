//forms accessing
const loginForm = document.querySelector("#login-form");
const registrationFrom = document.querySelector("#registration-form");

//forms field accessing
const username = loginForm.querySelector("[name='username']");
const password = loginForm.querySelector("[name='password']");

//error output box and p tag
const errorBox = loginForm.querySelector("#error-box");
const errorBoxP = loginForm.querySelector("#error-box-p");

//user not found message hiding
setTimeout(() => {
  const messageElement = document.getElementById("loginMessage");
  if (messageElement) {
    messageElement.style.display = "none";
  }
}, 3000);

//login form validation
loginForm.addEventListener("submit", (e) => {
  if (username.value == "" || password.value == "") {
    e.preventDefault();
    errorBox.classList.remove("hidden");
    errorBox.classList.add("flex");
    errorBoxP.innerHTML = "username and password required";
  }
});
