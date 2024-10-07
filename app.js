const express   = require('express')
const app       = express()
const mysql     = require('mysql2')
const moment    = require('moment')
const {body, query, validationResult} = require('express-validator')


// sambungkan ke mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dbjfd_sep24'
})

// buka koneksi
db.connect()


const model_jabatan     = require('./model/model_jabatan')
const model_agama       = require('./model/model_agama')
const model_karyawan    = require('./model/model_karyawan')


// untuk mengambil data yg ter-encoded(enkripsi) dari form html
// yang dikirimkan melalui protokol http
app.use( express.urlencoded({extended:false}) )
app.set('view engine', 'ejs')
app.set('views', './view-ejs')


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
        karyawan: await model_karyawan.getAll_karyawan(),
        notifikasi: req.query.notif,
    }
    res.render('page-karyawan', data)
})


app.get('/karyawan/detail/:id_karyawan', async function(req,res) {
    // ambil data karyawan 1 aja
    let data = {
        satukaryawan: await model_karyawan.getOne_karyawan( req.params.id_karyawan )
    }
    res.render('page-karyawan-detail', data)
})





app.get('/karyawan/tambah', async function(req,res) {
    let data = {
        jabatan: await model_jabatan.getAll_jabatan(),
        agama: await model_agama.getAll_agama(),
    }
    res.render('page-karyawan-form-tambah', data)
})




let formValidasiInsert = [
    body('form_nik').notEmpty().isNumeric(),
    body('form_nama').notEmpty().isString(),
]

app.post('/karyawan/proses-insert-data', formValidasiInsert, async function(req,res) {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            let insert = await model_karyawan.insert_karyawan( req )
            if (insert.affectedRows > 0) {
                res.redirect('/karyawan?notif=Berhasil input karyawan baru')
            }
        } catch (error) {
            throw error
        }
    }
    else {
        let errorData = {
            pesanError: errors.array()
        }
        errorData.pesanError[0].fields
        res.render('page-karyawan-form-tambah', errorData)
    }
})










app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
    try {
        let hapus = await model_karyawan.hapusKaryawan( req.params.id_karyawan )
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})



app.get('/karyawan/edit/:id_karyawan', async function(req,res) {
    let data = {
        satukaryawan: await model_karyawan.getOne_karyawan( req.params.id_karyawan ),
        jabatan: await model_jabatan.getAll_jabatan(),
        agama: await model_agama.getAll_agama(),
        moment: moment,
    }
    res.render('page-karyawan-form-edit', data)
})



app.post('/karyawan/proses-update-data/:id_karyawan', async function(req,res) {
    try {
        let update = await model_karyawan.update_karyawan( req )
        if (update.affectedRows > 0) {
            res.redirect('/karyawan?notif=Berhasil perbarui data karyawan')
        }
    } catch (error) {
        
    }
})







app.listen(3000, ()=>{
    console.log('Server aktif, buka http://localhost:3000')
})