// memangill modul bawaan dari node.js yaitu http 
// untuk membuat server http
const http = require('http')

http.createServer( function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})

    // halaman utama
    if (request.url == '/') {
        response.end(
            `<h1>Selamat datang di website ajikowiyu.com</h1><hr>
            <a href="/profil">Lihat Profil</a>`
        )
    }
    // halaman profil
    else if (request.url == '/profil') {
        let tahun_lahir = 1990
        let tahun_ini = 2024
        let umur = tahun_ini - tahun_lahir

        response.end(
            `<ul>
                <li>Nama lengkap: Aji Kowiyu</li>
                <li>Nama panggilan: Aji/Kowi</li>
                <li>Alamat: Pluit, Jakarta Utara</li>
                <li>Pekerjaan: Senior Programmer @ Agung Podomoro Group</li>
                <li>tanggal lahir: 17 Agustus ${tahun_lahir}</li>
                <li>umur: ${umur} tahun</li>
            </ul>
            <br>
            <a href="/">Balik ke beranda</a>`
        )
    }
    // halaman hubungi-saya
    else if (request.url == '/hubungi-saya') {
        let kontak = {
            wa: '081293260970',
            email: 'ajikowiyu@gmail.com',
            linkedin: 'linkedin.com/ajikowiyu',
            ig: '@aji_kowiyu',
        }

        response.end(
            `<ul>
                <li>WhatsApp: ${kontak.wa}</li>
                <li>Email: ${kontak.email}</li>
                <li>LinkedIn: ${kontak.linkedin}</li>
                <li>Instagram: ${kontak.ig}</li>
            </ul>`
        )
    }
    // untuk menangani halaman atau URL yg tidak ada
    else {
        response.end(`<h1>404: Halaman tidak ditemukan</h1><hr>`)
    }
}).listen(3000, function() {
    console.log('Server aktif, buka http://localhost:3000')
})

// tes nambah komentar
// kirim ke 2x