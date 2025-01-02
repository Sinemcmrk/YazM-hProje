async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function login(event) {
  event.preventDefault();

  const user = localStorage.getItem("user");

  if (!user) {
    alert("No user found");
    return;
  }

  const { username, password } = JSON.parse(user);
  const storedHashedPassword = password;

  const form = document.getElementById("loginForm");
  const inputUsername = form.username.value;
  const inputPassword = form.password.value;

  console.log(username, storedHashedPassword, inputUsername, inputPassword);
  if (
    inputUsername === username &&
    storedHashedPassword === (await hashPassword(inputPassword))
  ) {
    localStorage.setItem("isLoggedIn", true);
    window.location.href = "/adminPanel/admin.html";
  } else {
    alert("Invalid username or password");
  }
}
