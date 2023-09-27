const mongoose = require('mongoose')


//Botón que proporciona información sobre el estado del comentario
const TODO_STATUS = {
    COMPLETE: 'complete',
    PENDING: 'pending',
    CANCEL: 'cancel',
}

const TODO_ENUM = Object.values(TODO_STATUS)


//Schema del comentario
const TodoSchema = new mongoose.Schema({
    title: { type: String, unique: true, required: true },
    user: {type:String,unique: true, required: true  },
    description: { type: String },
    status: { type: String, enum: TODO_ENUM, default: TODO_STATUS.PENDING },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

const TodoModel = mongoose.model('Todo', TodoSchema)

module.exports = {
    TodoSchema,
    TodoModel,
    TODO_STATUS,
    TODO_ENUM,
}
