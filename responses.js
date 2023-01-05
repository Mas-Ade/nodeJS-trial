
// konstanta respon (status kode untuk terhubung, data dari database, pesan yang akan ditampilkan, pemanggilan library func res)
const responses =  (statusCode, data, message, res ) => {
   res.status(statusCode).json({
        payload: {
            status_code: statusCode,
            datas: data,
            message: message
        }
    })

}

module.exports = responses