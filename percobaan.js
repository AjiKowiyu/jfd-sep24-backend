// memangill modul bawaan dari node.js yaitu http 
// untuk membuat server http
const http = require('http')

http.createServer( function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})

    // halaman utama
    if (request.url == '/') {
        response.end(`<h1>Selamat datang di website ajikowiyu.com</h1><hr>`)
    }
    // halaman profil
    else if (request.url == '/profil') {
        response.end(
            `<ul>
                <li>Nama lengkap: Aji Kowiyu</li>
                <li>Nama panggilan: Aji/Kowi</li>
                <li>Alamat: Pluit, Jakarta Utara</li>
                <li>Pekerjaan: Senior Programmer @ Agung Podomoro Group</li>
            </ul>`
        )
    }
    // halaman hubungi-saya
    else if (request.url == '/hubungi-saya') {
        response.end(
            `<ul>
                <li>WA: 081293260970</li>
                <li>Email: ajikowiyu@gmail.com</li>
            </ul>`
        )
    }
    // untuk menangani halaman atau URL yg tidak ada
    else {
        response.end(`<h1>404: Halaman tidak ditemukan</h1><hr>`)
    }
}).listen(3000, function() {
    console.log('Server sudah nyala, buka http://localhost:3000')
})