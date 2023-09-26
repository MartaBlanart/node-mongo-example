require('dotenv').config()

const { PORT = 3000, URL_MONGO } = process.env

module.exports = {
    PORT: parseInt(PORT),
    URL_MONGO,
}
