console.log("app.js TERLOAD");

// LOGIN
function login(){
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user === "admin" && pass === "123"){
    localStorage.setItem("login", "1");
    window.location.href = "./dashboard.html";
  } else {
    alert("Username atau password salah");
  }
}

// CEK LOGIN DI DASHBOARD
if (document.body.innerHTML.includes("Dashboard Gudang")) {
  if (localStorage.getItem("login") !== "1") {
    window.location.href = "./index.html";
  }
}

// LOGOUT
function logout(){
  localStorage.removeItem("login");
  window.location.href = "./index.html";
}