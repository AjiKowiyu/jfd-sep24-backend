// syarat menggunakan variabel/object yg ada di file lain:
// 1.panggil dulu filenya
// 2.file yg dipanggil, sudah mengekspor variabelnya
// 3.panggil file.variabel

// cara penulisan ke-1
const dp = require('./data_pribadi')
console.log(dp.nama_lengkap)
console.log(dp.alamat)

// cara penulisan ke-2
console.log(require('./data_pribadi').nama_lengkap)
console.log(require('./data_pribadi').alamat)

