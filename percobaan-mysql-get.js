const mysql = require('mysql2')
const http  = require('http')
const fs    = require('fs')


// sambungkan ke mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbjfd_sep24'
})


// buka koneksi
db.connect( (error)=>{
    if (error) {
        throw error
    } else {
        console.log('berhasil tersambung ke mysql')
    }
})




function getAll_karyawan() {
    return new Promise( (resolve, reject) => {
        db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}





http.createServer( async function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})

    if (request.url == '/') {
        fs.createReadStream('./view/halaman-utama.html').pipe(response)
    }
    else if (request.url == '/karyawan') {

        // tarik data dari db
        let data = await getAll_karyawan()

        // kirim hasilnya ke front-end
        response.end(
            `<h1>Data Karyawan PT Data Informasi Teknologi</h1>
            <hr>
            Nama Lengkap: ${data[0].nama} <br>
            Nomor Induk Karyawan: ${data[0].nik} <br>
            <pre>
                ${JSON.stringify(data, null, 4)}
            </pre>`
        )
    }
}).listen(3000, function() {
    console.log('Server aktif, buka http://localhost:3000')
})