// memangill modul bawaan dari node.js yaitu http 
// untuk membuat server http
const http = require('http')

http.createServer( function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})
    response.end(
        `<h1>Selamat datang di website ajikowiyu.com</h1><hr>
        <button>klik</button>
        <ul>
            <li>Ronaldo</li>
            <li></li>
        </ul>`
    )
}).listen(3000, function() {
    console.log('Server aktif, buka http://localhost:3000')
})

// tes nambah komentar
// kirim ke 2x