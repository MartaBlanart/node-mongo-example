const Joi = require("joi")

const { TodoModel, TODO_ENUM } = require("../../schemas/todo.schema")

/**
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
const findTodoController = async (req, res, next) => {
    try {
        const { sort, order, status } = await queryDtoSchema.validateAsync(req.query)

        const filter = {}

        if (status) {
            filter.status = status
        }

        const todos = await TodoModel.find(filter).sort({ [sort]: order }).select('-__v').lean().exec()

        res.status(200).json(todos)
    } catch (err) {
        next(err)
    }
}

const queryDtoSchema = Joi.object({
    sort: Joi.string().optional().default('createdAt'),
    order: Joi.number().valid(-1, 1).optional().default(1),
    status: Joi.string().valid(...TODO_ENUM).optional(),
})

module.exports = findTodoController