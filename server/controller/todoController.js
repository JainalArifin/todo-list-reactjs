const Model = require('../models/Todolist')
const jwt = require('jsonwebtoken')

module.exports = {
    findAll: (req, res) =>{
        Model.find()
        .then((dataTodo)=>{
            res.send(dataTodo)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    createTodo: (req, res) =>{
        jwt.verify(req.headers.token, process.env.SECRET, (err, dataUser)=>{
            // console.log(dataUser, ' <---- cek user')
            Model.create({
                content: req.body.content,
                status: req.body.status,
                user: dataUser.id
            })
            .then((dataTodo)=>{
                res.send(dataTodo)
            })
            .catch((err)=>{
                res.send(err)
            })
        })
    },
    editTodo: (req, res) =>{
        Model.findOneAndUpdate({
            _id: req.params.id
        },{
            content: req.body.content,
            status: req.body.status
        })
        .then((dataTodo) => {
            res.send(dataTodo)
        })
        .catch((err)=>{
            res.send(err)
        })
    },
    delete: (req, res) =>{
        Model.remove({
            _id: req.params.id
        })
        .then(()=>{
            res.send('success to delete')
        })
        .then((err)=>{
            res.send(err)
        })
    }
}