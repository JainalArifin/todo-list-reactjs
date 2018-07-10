const Model = require('../models/User')
const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = {
    register: (req, res) => {
        let bcrypt = require('bcryptjs');
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(`req.body.password`, salt);
        let adminNew = new Model({
            username: req.body.username,
            password: hash,
            rule: req.body.rule
        })
        adminNew.save()
        .then((dataAdmin)=>{
            res.send(dataAdmin)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    login: (req, res) => {
        Model.findOne({
            username: req.body.username
        })
        .then((dataUsername) => {
            // console.log(dataUsername, ' <---- datausername 1')
            if(dataUsername == null){
                res.send('usser belum terdaftar')
            } else {
                let token = jwt.sign({
                    id: dataUsername._id,
                    username: dataUsername.username,
                    password: dataUsername.password,
                    rule: dataUsername.rule
                }, process.env.SECRET)
                // console.log(dataUsername, ' <---- datausername 2')
                var test = {...dataUsername}
                delete test._doc.password
                delete test._doc.__v
                // console.log(test, ' <---- userData')
                res.send({
                    token:token,
                    userData: test._doc
                })
            }
        })
        .catch((err)=> {
            res.send(err)
        })
    },
    all: (req, res) => {
        Model.find({})
        .populate({path:'Todolist'}).exec((err, data)=>{
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        })
        // .then((dataAdmin) => {
        //     res.send(dataAdmin)
        // })
        // .catch((err) => {
        //     res.send(err)
        // })
    },
    update: (req, res)=> {
        let bcrypt = require('bcryptjs');
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(`req.body.password`, salt);
        Model.findOneAndUpdate({
            _id: req.params.id
        },{
            username: req.body.username,
            password: hash,
        })
        .then((dataUser) => {
            res.send(dataUser)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    delete: (req, res) => {
        Model.remove({
            _id: req.params.id
        })
        .then((dataUser)=>{
            res.send({
                message: 'user berhasil di hapus',
                dataUser: dataUser
            })
        })
        .catch((err)=> {
            res.send(err)
        })
    }
}