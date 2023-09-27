const Joi = require('joi')

const { TodoModel, TODO_ENUM } = require('../../schemas/todo.schema')

/**
 * Comentario para el autocompletado(req,res,nex)
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */

 /**
      Siempre debe ser async con sus await(espera de respuesta)
      (req,res,next)=> petición, respuesta, siguiente
      bodyDtoSchema: sería el schema que hay que hacer en una consulta CRUD del bodyDto que es este caso sería el endPoint
      .lean() y .exec(): BUSCAR INFO
      status: controlar los estados de la petición
         * 
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


        /**Propiesdades del objeto */
const bodyDtoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string()
        .valid(...TODO_ENUM)
        .optional(),
})

module.exports = createTodoController
