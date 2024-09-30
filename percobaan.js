// memangill modul bawaan dari node.js yaitu http 
// untuk membuat server http
const http = require('http')
const fs = require('fs')

http.createServer( function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})

    // halaman utama
    if (request.url == '/') {
        fs.createReadStream('./view/halaman-utama.html').pipe(response)
    }
    // halaman profil
    else if (request.url == '/profil') {
        fs.createReadStream('./view/halaman-profil.html').pipe(response)
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