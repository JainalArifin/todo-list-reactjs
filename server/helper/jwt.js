const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    isLogin: (req, res, next) => {
        console.log(req.headers.token, ' < ----- token')
        jwt.verify(req.headers.token, process.env.SECRET, (err, decoded)=>{
            console.log(decoded, ' <---- decoded')
            if(err){
                console.log('<---- masuk sini')
                res.send('anda belum login')
            }
            req.id = decoded.id
            next()
        })
    }
}