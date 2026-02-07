function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    localStorage.setItem("login", "yes");
    location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Login gagal";
  }
}

function logout() {
  localStorage.removeItem("login");
  location.href = "index.html";
}

if (location.pathname.includes("dashboard")) {
  if (localStorage.getItem("login") !== "yes") {
    location.href = "login.html";
  }
}