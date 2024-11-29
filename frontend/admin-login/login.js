// HTML elementlerini seç
const goToLoginBtn = document.getElementById('go-to-login');
const goToRegisterBtn = document.getElementById('go-to-register');
const container = document.querySelector('.container');

// Register butonuna tıklayınca overlay sağa kayar
goToRegisterBtn.addEventListener('click', () => {
  container.classList.add('register-mode');
});

// Login butonuna tıklayınca overlay sola kayar
goToLoginBtn.addEventListener('click', () => {
  container.classList.remove('register-mode');
});
