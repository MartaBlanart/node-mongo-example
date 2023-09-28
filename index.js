//Express, morgan y cors son bibliotecas de Nodejs
/**
 * Marco de desarrollo web que te permite construir fácilmente aplicaciones web en Node.js. 
 * Puedes utilizarlo para definir rutas y manejar solicitudes HTTP en tu servidor.
 * app.use(express.json())
 */
const express = require('express')
/**Middleware de registro (logger) para Express.
 *  Puedes usarlo para registrar las solicitudes HTTP que llegan a tu servidor,
 *  lo que es útil para el diagnóstico y la depuración */
const morgan = require('morgan')
/**
 * Middleware que te permite controlar la política de acceso a recursos 
 * en tu servidor desde diferentes orígenes (dominios)
 */
const cors = require('cors')

const { PORT } = require('./src/config/common')
const { initializeMongoConnection } = require('./src/config/mongo')
const handleMiddlewareError = require('./src/middlewares/handleError.middleware')

const startServer = async () => {
    const app = express()

    await initializeMongoConnection()

    app.use(express.json())
    // Habilita CORS
    app.use(cors())
    // Configura el registro de solicitudes HTTP con Morgan
   //El argumento 'dev' especifica un formato de registro predefinido que es útil para el desarrollo
    app.use(morgan('dev'))

    app.use('/api', require('./src/routes/index.routes'))

    app.use(handleMiddlewareError)

    app.listen(PORT, () =>
        console.log(`Server running on: http://127.0.0.1:${PORT}`)
    )
}

startServer()
