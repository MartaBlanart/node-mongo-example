const Joi = require("joi")

const { TodoModel } = require("../../schemas/todo.schema")

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const findOneTodoController = async (req, res, next) => {
    try {
        const { id } = await paramsDtoSchema.validateAsync(req.params)

        const todo = await TodoModel.findById(id).select('-__v').lean().exec()
        if (!todo) {
            return res.status(404).json({ error: 'TodoModel not found' })
        }

        res.status(200).json(todo)
    } catch (err) {
        next(err)
    }
}

const paramsDtoSchema = Joi.object({
    id: Joi.string().required(),
})

module.exports = findOneTodoController