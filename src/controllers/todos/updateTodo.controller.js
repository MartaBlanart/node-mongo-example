const Joi = require('joi')

const { TodoModel, TODO_ENUM } = require('../../schemas/todo.schema')

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const updateTodoController = async (req, res, next) => {
    try {
        const { id } = await paramsDtoSchema.validateAsync(req.params)
        const bodyDto = await bodyDtoSchema.validateAsync(req.body)

        const todo = await TodoModel.findById(id).lean().exec()
        if (!todo) {
            return res.status(409).json({ error: 'TodoModel not found' })
        }

        if (todo.title !== bodyDto?.title) {
            const todoTitleUnique = await TodoModel.findOne({
                title: bodyDto.title,
            })
                .lean()
                .exec()
            if (todoTitleUnique) {
                return res
                    .status(409)
                    .json({ error: 'Todo title already exist' })
            }
        }

        await TodoModel.updateOne({ _id: id }, bodyDto).exec()

        res.status(204).send()
    } catch (err) {
        next(err)
    }
}

const paramsDtoSchema = Joi.object({
    id: Joi.string().required(),
})

const bodyDtoSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string()
        .optional()
        .valid(...TODO_ENUM)
        .optional(),
})

module.exports = updateTodoController
