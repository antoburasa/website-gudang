// ===== TEST JS TERBACA =====
console.log("app.js TERBACA");

// ===== FIREBASE CONFIG =====
var firebaseConfig = {
  apiKey: "AIzaSyDbf4nf0iQleiB3R8Un89Gpi1Oio-tTB3o",
  authDomain: "gudang-sms-4c81c.firebaseapp.com",
  databaseURL: "https://gudang-sms-4c81c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gudang-sms-4c81c",
  appId: "1:598362736106:web:c8e2732d6ac7613931de93"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.database();

// ===== NAVIGASI =====
function showPage(id) {
  document.querySelectorAll('.card').forEach(el => el.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ===== SIMPAN BARANG =====
function simpanBarang() {
  var nama = document.getElementById("namaBarang").value;
  var min = document.getElementById("minStok").value;

  if (nama === "" || min === "") {
    alert("Lengkapi data!");
    return;
  }

  db.ref("barang/" + nama).set({
    stok: 0,
    min: Number(min)
  });

  alert("Barang berhasil disimpan ✅");
  document.getElementById("namaBarang").value = "";
  document.getElementById("minStok").value = "";
}

// ===== BARANG MASUK =====
function barangMasuk() {
  var nama = document.getElementById("barangMasuk").value;
  var qty = Number(document.getElementById("qtyMasuk").value);

  if (nama === "" || qty <= 0) {
    alert("Data tidak valid");
    return;
  }

  var ref = db.ref("barang/" + nama + "/stok");
  ref.transaction(stok => (stok || 0) + qty);

  alert("Barang masuk tersimpan ✅");
  document.getElementById("barangMasuk").value = "";
  document.getElementById("qtyMasuk").value = "";
}

// ===== TAMPILKAN STOK =====
db.ref("barang").on("value", snapshot => {
  var html = "";
  snapshot.forEach(child => {
    var data = child.val();
    html += <div>${child.key} : ${data.stok}</div>;
  });
  document.getElementById("listStok").innerHTML = html || "Belum ada data";
});