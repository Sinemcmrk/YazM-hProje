// Butonlar ve container seçimi
const toLoginButton = document.getElementById("to-login");
const toRegisterButton = document.getElementById("to-register");
const container = document.querySelector(".container");

// Register moduna geçiş
toRegisterButton.addEventListener("click", () => {
  container.classList.add("register-mode");
});

// Login moduna geçiş
toLoginButton.addEventListener("click", () => {
  container.classList.remove("register-mode");
});
