const Joi = require('joi')

const { TodoModel, TODO_ENUM } = require('../../schemas/todo.schema')

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const createTodoController = async (req, res, next) => {
    try {
        const bodyDto = await bodyDtoSchema.validateAsync(req.body)

        const todoTitleUnique = await TodoModel.findOne({
            title: bodyDto.title,
        })
            .lean()
            .exec()
        if (todoTitleUnique) {
            return res.status(409).json({ error: 'Todo title already exist' })
        }

        await TodoModel.create(bodyDto)

        res.status(201).send()
    } catch (err) {
        next(err)
    }
}

const bodyDtoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string()
        .valid(...TODO_ENUM)
        .optional(),
})

module.exports = createTodoController
