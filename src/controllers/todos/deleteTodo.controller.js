const Joi = require("joi")

const { TodoModel, TODO_ENUM } = require("../../schemas/todo.schema")

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
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
    id: Joi.string().required(),
})

module.exports = deleteTodoController