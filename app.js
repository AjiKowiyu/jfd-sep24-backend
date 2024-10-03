const express   = require('express')
const app       = express()
const mysql     = require('mysql2')


// sambungkan ke mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbjfd_sep24'
})

// buka koneksi
db.connect()


function getAll_karyawan() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT 
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan, 
            agm.nama as agama_nama 
        FROM karyawan as kry 
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
        LEFT JOIN agama as agm ON agm.id = kry.agama`

        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}



function getOne_karyawan() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT 
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan, 
            agm.nama as agama_nama 
        FROM karyawan as kry 
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
        LEFT JOIN agama as agm ON agm.id = kry.agama
        WHERE kry.id = 13`

        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}



app.set('view engine', 'ejs')   //setting penggunaan template engine untuk express
app.set('views', './view-ejs')  //setting penggunaan folder untuk menyimpan file .ejs


// function render('nama-file')
// nama file nya wajib berekstensi .ejs
// otomatis mengambil file .ejs yg ada di folder view-ejs


app.get('/', function(req, res) {
    res.render('beranda')
})


app.get('/pendidikan', function(req, res) {
    let profil = {
        nama: 'Aji Kowiyu',
        s1: 'ITB Swadharma: Sistem Informasi',
        smk: 'SMK Remaja Pluit: Akuntansi',
    }
    res.render('page-pendidikan', profil)
})


app.get('/karyawan', async function(req, res) {
    // proses penarikan data
    let data = {
        karyawan: await getAll_karyawan()
    }
    res.render('page-karyawan', data)
})


app.get('/karyawan/detail', async function(req,res) {
    // ambil data karyawan 1 aja
    let data = {
        satukaryawan: await getOne_karyawan()
    }
    res.render('page-karyawan-detail', data)
})


app.listen(3000, ()=>{
    console.log('Server aktif, buka http://localhost:3000')
})