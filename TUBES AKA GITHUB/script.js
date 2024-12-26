// Data pelanggan disimpan dalam array
let dataPelanggan = [];

// Generate 10000 data pelanggan secara otomatis
function generateData() {
  for (let i = 1; i <= 100000; i++) {
    const randomDate = new Date(2023, Math.floor(Math.random() * 12), Math.ceil(Math.random() * 28));
    const formattedDate = randomDate.toISOString().split('T')[0];
    dataPelanggan.push({
      nama: `Pelanggan ${i}`,
      noAntrian: i,
      waktuMasuk: formattedDate,
      waktuKeluar: formattedDate
    });
  }

  // Urutkan data berdasarkan waktuMasuk
  dataPelanggan.sort((a, b) => new Date(a.waktuMasuk) - new Date(b.waktuMasuk));
}

// Tampilkan data pelanggan di halaman
function updateDataList(jumlah) {
  const dataList = document.getElementById("dataList");
  dataList.innerHTML = ""; // Bersihkan daftar sebelumnya

  dataPelanggan.slice(0, jumlah).forEach((data, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. Nama: ${data.nama}, No Antrian: ${data.noAntrian}, Masuk: ${data.waktuMasuk}, Keluar: ${data.waktuKeluar}`;
    dataList.appendChild(listItem);
  });
}

// Fungsi pencarian iteratif
function cariPelangganIteratif(tanggal) {
  const results = [];
  for (let i = 0; i < dataPelanggan.length; i++) {
    if (dataPelanggan[i].waktuMasuk === tanggal || 
      dataPelanggan[i].waktuKeluar === tanggal) {
      results.push(dataPelanggan[i]);
    }
  }
  return results;
}

// Fungsi pencarian rekursif
function cariPelangganRekursif(tanggal, index = 0, results = []) {
  if (index >= dataPelanggan.length) return results;
  if (dataPelanggan[index].waktuMasuk === tanggal || 
    dataPelanggan[index].waktuKeluar === tanggal) {
    results.push(dataPelanggan[index]);
  }
  return cariPelangganRekursif(tanggal, index + 1, results);
}

// Tampilkan hasil pencarian
function tampilkanHasil(results, runtime) {
  const resultList = document.getElementById("resultList");
  resultList.innerHTML = ""; // Bersihkan hasil sebelumnya

  if (results.length > 0) {
    results.forEach((data) => {
      const listItem = document.createElement("li");
      listItem.textContent = `Nama: ${data.nama}, No Antrian: ${data.noAntrian}`;
      resultList.appendChild(listItem);
    });
  } else {
    resultList.innerHTML = "<li>Tidak ada pelanggan yang ditemukan.</li>";
  }

  // Tampilkan waktu eksekusi
  const runtimeDisplay = document.createElement("p");
  runtimeDisplay.textContent = `Waktu Eksekusi: ${runtime.toFixed(4)} ms`;
  resultList.appendChild(runtimeDisplay);
}

// Event listener untuk filter jumlah data
document.getElementById("jumlahData").addEventListener("input", (e) => {
  const jumlah = parseInt(e.target.value);
  if (jumlah > 0 && jumlah <= 100000) {
    updateDataList(jumlah);
  }
});

// Event listener untuk pencarian iteratif
document.getElementById("searchIterativeButton").addEventListener("click", () => {
  const searchDate = document.getElementById("searchDate").value;
  if (searchDate) {
    const start = performance.now(); // Waktu mulai
    const results = cariPelangganIteratif(searchDate);
    const end = performance.now(); // Waktu selesai
    tampilkanHasil(results, end - start);
  } else {
    alert("Masukkan tanggal untuk mencari.");
  }
});

// Event listener untuk pencarian rekursif
document.getElementById("searchRecursiveButton").addEventListener("click", () => {
  const searchDate = document.getElementById("searchDate").value;
  if (searchDate) {
    const start = performance.now(); // Waktu mulai
    const results = cariPelangganRekursif(searchDate);
    const end = performance.now(); // Waktu selesai
    tampilkanHasil(results, end - start);
  } else {
    alert("Masukkan tanggal untuk mencari.");
  }
});

// Inisialisasi
generateData();
updateDataList(100000);
