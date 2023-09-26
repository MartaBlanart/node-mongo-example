const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { PORT } = require('./src/config/common')
const { initializeMongoConnection } = require('./src/config/mongo')
const handleMiddlewareError = require('./src/middlewares/handleError.middleware')

const startServer = async () => {
    const app = express()

    await initializeMongoConnection()

    app.use(express.json())
    app.use(cors())
    app.use(morgan('dev'))

    app.use('/api', require('./src/routes/index.routes'))

    app.use(handleMiddlewareError)

    app.listen(PORT, () =>
        console.log(`Server running on: http://127.0.0.1:${PORT}`)
    )
}

startServer()
