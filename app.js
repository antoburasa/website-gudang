window.addEventListener("DOMContentLoaded", function() {

  const firebaseConfig = {
    apiKey: "AIzaSyDbf4nf0iQleiB3R8Un89Gpi1Oio-tTB3o",
    authDomain: "gudang-sms-4c81c.firebaseapp.com",
    databaseURL: "https://gudang-sms-4c81c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "gudang-sms-4c81c",
    appId: "1:598362736106:web:c8e2732d6ac7613931de93"
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();

  // SIDEBAR
  window.show = function(id){
    document.querySelectorAll('.card').forEach(c => c.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
  };

  // MASTER BARANG
  window.simpanBarang = function(){
    const nama = document.getElementById("namaBarang").value.trim();
    const min = document.getElementById("minStok").value;
    if(!nama) return alert("Nama barang kosong");
    db.ref('barang/'+nama).set({stok:0, min:min}, err=>{
      if(err) alert("Error: "+err.message);
      else alert("✅ Barang disimpan");
    });
  };

  // BARANG MASUK
  window.barangMasuk = function(){
    const b = document.getElementById("masukBarang").value.trim();
    const q = parseInt(document.getElementById("masukQty").value);
    if(!b || !q) return alert("Data belum lengkap");
    db.ref('barang/'+b+'/stok').transaction(s => (s||0)+q);
    db.ref('riwayat').push({barang:b, jenis:'masuk', qty:q});
    alert("✅ Barang masuk disimpan");
  };

  // BARANG KELUAR
  window.barangKeluar = function(){
    const b = document.getElementById("keluarBarang").value.trim();
    const q = parseInt(document.getElementById("keluarQty").value);
    if(!b || !q) return alert("Data belum lengkap");
    db.ref('barang/'+b+'/stok').transaction(s => (s||0)-q);
    db.ref('riwayat').push({barang:b, jenis:'keluar', qty:q});
    alert("✅ Barang keluar disimpan");
  };

  // TAMPIL STOK
  const listStok = document.getElementById("listStok");
  db.ref('barang').on('value', snap=>{
    let html = '';
    snap.forEach(c=>{
      html += <div>${c.key} : ${c.val().stok}</div>;
    });
    listStok.innerHTML = html || "Belum ada data";
  });

  // TAMPIL RIWAYAT
  const listRiwayat = document.getElementById("listRiwayat");
  db.ref('riwayat').on('child_added', snap=>{
    const d = snap.val();
    const li = document.createElement('li');
    li.textContent = ${d.barang} - ${d.jenis} (${d.qty});
    listRiwayat.prepend(li);
  });

});