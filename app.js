// ===== LOGIN =====
function login(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  // username & password sederhana
  if(user === "admin" && pass === "123"){
    localStorage.setItem("login", "1");
    window.location.href = "dashboard.html";
  }else{
    alert("Username atau password salah");
  }
}

// ===== CEK LOGIN DI DASHBOARD =====
if (document.title === "Dashboard") {
  if (localStorage.getItem("login") !== "1") {
    window.location.href = "index.html";
  }
}

// ===== LOGOUT =====
function logout(){
  localStorage.removeItem("login");
  window.location.href = "index.html";
}