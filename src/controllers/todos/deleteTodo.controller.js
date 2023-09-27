const Joi = require('joi')

const { TodoModel } = require('../../schemas/todo.schema')

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

//Aqui se crea el controlador que controla el borrado de los comentarios que haya registrados

/**
 * IMPORTANTE: las consultas CRUD siempre llevan schema y model del endpoint que se vaya hacer
 * la forma más correcta es hacerlo async 
 */
const deleteTodoController = async (req, res, next) => {
    try {
        const { id } = await paramsDtoSchema.validateAsync(req.params)

        const todo = await TodoModel.findById(id).lean().exec()
        if (!todo) {
            return res.status(409).json({ error: 'TodoModel not found' })
        }

        await TodoModel.deleteOne({ _id: id }).exec()

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}

const paramsDtoSchema = Joi.object({
    //Propiedades del endpoint que estemos creando 
    id: Joi.string().required(),
})

module.exports = deleteTodoController
