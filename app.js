// ===== LOGIN =====
function login() {
  const u = document.getElementById("user").value;
  const p = document.getElementById("pass").value;

  if (u === "admin" && p === "1234") {
    localStorage.setItem("login", "ok");
    window.location.href = "dashboard.html";
  } else {
    document.getElementById("msg").innerText = "Username / Password salah";
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("login");
  window.location.href = "index.html";
}

// ===== PROTEKSI DASHBOARD =====
if (document.title === "Dashboard") {
  if (localStorage.getItem("login") !== "ok") {
    window.location.href = "login.html";
  }
}