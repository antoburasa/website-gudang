alert("JS JALAN ✅");

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyDbf4nf0iQleiB3R8Un89Gpi1Oio-tTB3o",
  authDomain: "gudang-sms-4c81c.firebaseapp.com",
  databaseURL: "https://gudang-sms-4c81c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gudang-sms-4c81c",
  appId: "1:598362736106:web:c8e2732d6ac7613931de93"
};

// ===== INIT FIREBASE =====
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// ===== SIDEBAR NAV =====
function showPage(id){
  document.querySelectorAll(".card")
    .forEach(el => el.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

// ===== MASTER BARANG =====
function simpanMaster(){
  const nama = document.getElementById("namaBarang").value.trim();
  const min  = parseInt(document.getElementById("minStok").value || 0);

  if(!nama) return alert("Nama barang kosong");

  db.ref("barang/" + nama).set({
    stok: 0,
    min: min
  }).then(() => {
    alert("Master barang tersimpan");
    document.getElementById("namaBarang").value = "";
    document.getElementById("minStok").value = "";
  });
}

// ===== BARANG MASUK =====
function barangMasuk(){
  const b = document.getElementById("masukBarang").value.trim();
  const q = parseInt(document.getElementById("masukQty").value);

  if(!b || !q) return alert("Data belum lengkap");

  db.ref("barang/" + b + "/stok")
    .transaction(s => (s || 0) + q);

  db.ref("riwayat").push({
    barang: b,
    jenis: "masuk",
    qty: q,
    waktu: Date.now()
  });

  alert("Barang masuk disimpan");
  document.getElementById("masukBarang").value = "";
  document.getElementById("masukQty").value = "";
}

// ===== BARANG KELUAR =====
function barangKeluar(){
  const b = document.getElementById("keluarBarang").value.trim();
  const q = parseInt(document.getElementById("keluarQty").value);

  if(!b || !q) return alert("Data belum lengkap");

  db.ref("barang/" + b + "/stok")
    .transaction(s => (s || 0) - q);

  db.ref("riwayat").push({
    barang: b,
    jenis: "keluar",
    qty: q,
    waktu: Date.now()
  });

  alert("Barang keluar disimpan");
  document.getElementById("keluarBarang").value = "";
  document.getElementById("keluarQty").value = "";
}

// ===== TAMPIL STOK =====
db.ref("barang").on("value", snap => {
  let html = "";
  snap.forEach(c => {
    html += <div>${c.key} : ${c.val().stok}</div>;
  });
  document.getElementById("listStok").innerHTML = html || "Belum ada data";
});

// ===== RIWAYAT =====
db.ref("riwayat").limitToLast(10).on("child_added", snap => {
  const d = snap.val();
  const li = document.createElement("li");
  li.textContent = ${d.barang} - ${d.jenis} (${d.qty});
  document.getElementById("listRiwayat").prepend(li);
});
