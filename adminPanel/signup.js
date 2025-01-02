async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function submitForm(event) {
  event.preventDefault();
  const form = document.getElementById("signupForm");
  const formData = new FormData(form);
  const hashedPassword = await hashPassword(formData.get("password"));
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: hashedPassword,
  };
  localStorage.setItem("user", JSON.stringify(data));
  console.log(data);
}
