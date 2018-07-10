const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    content: String,
    status: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Todolist = mongoose.model('Todolist', todoSchema)
module.exports = Todolist