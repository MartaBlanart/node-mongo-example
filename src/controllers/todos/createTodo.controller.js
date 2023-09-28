
//Se crea el objeto
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
const createCommentController = async (req, res, next) => {
    try {
        const comment = await commentSchema.validateAsync(req.body)

        const todoTitleUnique = await TodoModel.findOne({
            title: comment.title,
        })
            .lean()
            .exec()
        if (commentTitleUnique) {
            return res.status(409).json({ error: 'Todo title already exist' })
        }
        

        //Se crea el comentario segun el modelo de datos estipulado 
        await TodoModel.create(bodyDto)
        
        //Se renderiza en estado correcto y se manda la respuesta
        res.status(201).send()

        //Se captura el error
    } catch (err) {
        //Hace que pase a la siguiente operación
        next(err)
    }
}


 /**Propiesdades del objeto
  * 
  */
const commentSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    status: Joi.string()
        .valid(...TODO_ENUM)
        .optional(),
})

module.exports = createTodoController
