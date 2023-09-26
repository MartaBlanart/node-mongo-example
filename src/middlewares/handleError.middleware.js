/**
 * @param {import("express").ErrorRequestHandler} error
 * @param {import("express").Request} _req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} _next
 */
const handleMiddlewareError = (error, _req, res, _next) => {
    const { name, message, stack } = error

    if (name === 'ValidationError') {
        return res.status(400).json({ error: message })
    }

    console.log('\x1b[0;31m' + stack + '\x1b[0m')

    return res.status(500).send({ error: 'Internal Server Error' })
}

module.exports = handleMiddlewareError
