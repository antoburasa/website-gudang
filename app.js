// ===== CEK LOGIN =====
if (document.title === "Dashboard") {
  if (localStorage.getItem("login") !== "1") {
    window.location.href = "login.html";
  }
}

// ===== MENU =====
function showMenu(id){
  document.querySelectorAll(".card").forEach(c=>{
    c.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
}

// ===== DATA =====
let data = JSON.parse(localStorage.getItem("barang")) || {};

// ===== MASTER BARANG =====
function simpanBarang(){
  const nama = document.getElementById("namaBarang").value;
  if(nama === ""){
    alert("Nama barang kosong");
    return;
  }
  if(!data[nama]){
    data[nama] = 0;
    localStorage.setItem("barang", JSON.stringify(data));
    alert("Barang disimpan");
    document.getElementById("namaBarang").value = "";
    tampilStok();
  }else{
    alert("Barang sudah ada");
  }
}

// ===== BARANG MASUK =====
function barangMasuk(){
  const nama = document.getElementById("barangMasuk").value;
  const qty = Number(document.getElementById("qtyMasuk").value);
  if(!data[nama]){
    alert("Barang belum ada");
    return;
  }
  data[nama] += qty;
  localStorage.setItem("barang", JSON.stringify(data));
  alert("Barang masuk berhasil");
  tampilStok();
}

// ===== BARANG KELUAR =====
function barangKeluar(){
  const nama = document.getElementById("barangKeluar").value;
  const qty = Number(document.getElementById("qtyKeluar").value);
  if(!data[nama]){
    alert("Barang belum ada");
    return;
  }
  data[nama] -= qty;
  localStorage.setItem("barang", JSON.stringify(data));
  alert("Barang keluar berhasil");
  tampilStok();
}

// ===== STOK =====
function tampilStok(){
  let html = "";
  for(let b in data){
    html += <div>${b} : ${data[b]}</div>;
  }
  document.getElementById("listStok").innerHTML = html || "Belum ada data";
}
tampilStok();

// ===== LOGOUT =====
function logout(){
  localStorage.removeItem("login");
  window.location.href = "index.html";
}